from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from typing import List, Optional
import os
from datetime import datetime, timedelta

app = FastAPI()

# Define input model
class UserInput(BaseModel):
    age_grouped: str
    sex: str
    income_grouped: str
    segment: str
    createdAt: Optional[str] = None  # Account creation date

# Load model
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
try:
    model_data = joblib.load(model_path)
    gbdt_models = model_data['gbdt_models']
    lr_models = model_data['lr_models']
    product_list = model_data['product_list']
    dummy_columns = model_data['dummy_columns']
except Exception as e:
    print(f"Error loading model: {str(e)}")
    # Provide default values for cold start
    gbdt_models = {}
    lr_models = {}
    product_list = ["ind_cco_fin_ult1", "ind_recibo_ult1", "ind_ctop_fin_ult1"]
    dummy_columns = []

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

    # Determine if user is a new customer based on account creation date
    # Consider new customer if account is less than 6 months old
    new_cust = '0'  # Default: not a new customer
    if user.createdAt:
        try:
            created_date = datetime.fromisoformat(user.createdAt.replace('Z', '+00:00'))
            six_months_ago = datetime.now() - timedelta(days=180)
            if created_date > six_months_ago:
                new_cust = '1'  # New customer if account is less than 6 months old
        except Exception as e:
            print(f"Error parsing date: {e}")

    # Create DataFrame with only the fields we have
    data = {
        'sex': 'H' if user.sex == 'M' else 'V' if user.sex == 'F' else user.sex,
        'segment': user.segment,
        'age_grouped': mapped_age_grouped,
        'income_grouped': mapped_income_grouped
    }
    
    # Add default values for required fields
    # emp_index: 'N' for normal customer, 'S' for bank staff
    # new_cust: '1' for new customer (< 6 months), '0' for existing customer
    # is_primary: '1' for primary account holder, '0' for secondary
    data.update({
        'emp_index': 'N',  # Default is 'N' for normal customer, not a bank employee
        'new_cust': new_cust,
        'is_primary': '1'  # Default is primary account holder
    })
    
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
        # If model loading failed, return default recommendations
        if not gbdt_models or not lr_models:
            return product_list

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
            return product_list  # Return default recommendations if no predictions

        return recommendations

    except Exception as e:
        print(f"Error generating recommendations: {str(e)}")
        return product_list  # Return default recommendations on error

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)