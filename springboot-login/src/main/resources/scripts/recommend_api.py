from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from typing import List

app = FastAPI()

# Định nghĩa model dữ liệu đầu vào
class UserInput(BaseModel):
    age_grouped: str
    sex: str
    income_grouped: str
    segment: str

# Load mô hình
model_path = 'src/main/resources/scripts/model.pkl'
try:
    model_data = joblib.load(model_path)
    gbdt_models = model_data['gbdt_models']
    lr_models = model_data['lr_models']
    product_list = model_data['product_list']
    dummy_columns = model_data['dummy_columns']
except Exception as e:
    raise Exception(f"Error loading model: {str(e)}")

# Ánh xạ tên sản phẩm
product_name_map = {
    'ind_ahor_fin_ult1': 'Savings Account',
    'ind_aval_fin_ult1': 'Guarantees',
    'ind_cco_fin_ult1': 'Current Account',
    'ind_cder_fin_ult1': 'Derivative Account',
    'ind_cno_fin_ult1': 'Payroll Account',
    'ind_ctju_fin_ult1': 'Junior Account',
    'ind_ctma_fin_ult1': 'More Particular Account',
    'ind_ctop_fin_ult1': 'Particular Account',
    'ind_ctpp_fin_ult1': 'Particular Plus Account',
    'ind_deco_fin_ult1': 'Short-term Deposits',
    'ind_deme_fin_ult1': 'Medium-term Deposits',
    'ind_dela_fin_ult1': 'Long-term Deposits',
    'ind_ecue_fin_ult1': 'E-Account',
    'ind_fond_fin_ult1': 'Funds',
    'ind_hip_fin_ult1': 'Mortgage',
    'ind_plan_fin_ult1': 'Pension Plan',
    'ind_pres_fin_ult1': 'Loans',
    'ind_reca_fin_ult1': 'Taxes',
    'ind_tjcr_fin_ult1': 'Credit Card',
    'ind_valo_fin_ult1': 'Securities',
    'ind_viv_fin_ult1': 'Home Account',
    'ind_nomina_ult1': 'Payroll',
    'ind_nom_pens_ult1': 'Pensions',
    'ind_recibo_ult1': 'Direct Debit'
}

def one_hot_encode(user: UserInput, dummy_columns):
    # Tạo DataFrame với các giá trị mặc định
    data = {
        'emp_index': 'A',  # Giá trị mặc định
        'sex': 'H' if user.sex == 'M' else 'V' if user.sex == 'F' else user.sex,
        'new_cust': '0.0',  # Giả sử không phải khách hàng mới
        'is_primary': '1.0',  # Giả sử là khách hàng chính
        'segment': user.segment,
        'age_grouped': user.age_grouped,
        'income_grouped': user.income_grouped
    }
    df = pd.DataFrame([data])
    for col in data.keys():
        df[col] = df[col].astype('string')
    df['segment'] = df['segment'].replace({
        '01 - TOP': 'VIP',
        '02 - PARTICULARES': 'Individuals',
        '03 - UNIVERSITARIO': 'Graduated'
    })
    # One-hot encoding
    dummy_df = pd.get_dummies(df)
    # Đảm bảo các cột khớp với dummy_columns
    dummy_df = dummy_df.reindex(columns=dummy_columns, fill_value=0)
    return dummy_df

@app.post("/recommend", response_model=List[str])
async def recommend(user: UserInput):
    try:
        # Mã hóa one-hot
        input_vector = one_hot_encode(user, dummy_columns)

        # Dự đoán xác suất
        pred_scores = {}
        for product in product_list:
            if product in gbdt_models and product in lr_models:
                gbdt_model = gbdt_models[product]
                lr_model = lr_models[product]
                gbdt_features = gbdt_model.apply(input_vector)[:, :, 0]
                lr_score = lr_model.predict_proba(gbdt_features)[:, 1][0]
                pred_scores[product] = lr_score
            else:
                pred_scores[product] = 0.0

        # Chọn top 3 sản phẩm
        pred_df = pd.Series(pred_scores).sort_values(ascending=False)
        recommendations = pred_df.head(3).index.tolist()

        if not recommendations:
            return ["Current Account", "Direct Debit", "Particular Account"]  # Cold start

        # Ánh xạ tên sản phẩm
        recommendations = [product_name_map.get(p, p) for p in recommendations]

        return recommendations

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)