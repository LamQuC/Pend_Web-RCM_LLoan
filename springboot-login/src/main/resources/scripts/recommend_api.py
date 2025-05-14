from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from typing import List

app = FastAPI()

# Define input model
class UserInput(BaseModel):
    age_grouped: str
    sex: str
    income_grouped: str
    segment: str

# Load model
model_path = 'src/main/resources/scripts/model.pkl'
try:
    model_data = joblib.load(model_path)
    gbdt_models = model_data['gbdt_models']
    lr_models = model_data['lr_models']
    product_list = model_data['product_list']
    dummy_columns = model_data['dummy_columns']
except Exception as e:
    raise Exception(f"Error loading model: {str(e)}")

def one_hot_encode(user: UserInput, dummy_columns):
    # Map new age_grouped values
    age_grouped_map = {
        '<25': 'young',
        '25-35': 'adult',
        '35-45': 'senior',
        '45+': 'elder'
    }
    # Map new income_grouped values
    income_grouped_map = {
        'Unknown': 'Low',
        '<50k': 'Low',
        '50k-100k': 'Ordinary',
        '100k+': 'High'
    }
    mapped_age_grouped = age_grouped_map.get(user.age_grouped, user.age_grouped)
    mapped_income_grouped = income_grouped_map.get(user.income_grouped, user.income_grouped)

    # Create DataFrame
    data = {
        'emp_index': 'A',  # Default
        'sex': 'H' if user.sex == 'M' else 'V' if user.sex == 'F' else user.sex,
        'new_cust': 'N',  # Default
        'is_primary': 'Y',  # Default
        'segment': user.segment,
        'age_grouped': mapped_age_grouped,
        'income_grouped': mapped_income_grouped
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
    # Ensure columns match dummy_columns
    dummy_df = dummy_df.reindex(columns=dummy_columns, fill_value=0)
    return dummy_df

@app.post("/recommend", response_model=List[str])
async def recommend(user: UserInput):
    try:
        # One-hot encode input
        input_vector = one_hot_encode(user, dummy_columns)

        # Predict probabilities
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

        # Select top 3 products
        pred_df = pd.Series(pred_scores).sort_values(ascending=False)
        recommendations = pred_df.head(3).index.tolist()

        if not recommendations:
            return ["ind_cco_fin_ult1", "ind_recibo_ult1", "ind_ctop_fin_ult1"]  # Cold start

        return recommendations  # Return raw product codes

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)