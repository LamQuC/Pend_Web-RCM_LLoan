# Pend_Web-RCM_LLoan

## Overview

This repository contains the source code for a machine learning project related to **loan data processing and prediction**.

The project focuses on building a pipeline that prepares data, trains a machine learning model, and generates a serialized model file (`.pkl`) for later inference.  
Due to repository size constraints and version control best practices, the trained model files are **not included in this repository**.

The repository mainly contains the **data processing scripts, model training code, and supporting utilities** needed to reproduce the workflow.

---

## Project Objectives

The main goals of this project are:

- Process and prepare loan-related data
- Train a machine learning model based on the processed dataset
- Serialize the trained model for later use
- Provide scripts that allow the model to be rebuilt if needed

---

## Repository Contents

This repository includes:

- Data preprocessing scripts
- Model training scripts
- Supporting utility code
- Configuration and dependency files

The trained model file (`.pkl`) is **not stored in the repository

---

> Note: The exact structure may vary depending on the version of the project.

---

## Model Training

The model used in this project is trained using the scripts provided in the repository.

Typical workflow:

1. Prepare and clean the dataset
2. Perform feature engineering
3. Train the machine learning model
4. Serialize the trained model using `pickle`

Example serialization:

```python
import pickle

with open("model.pkl", "wb") as f:
    pickle.dump(model, f)
```
The resulting file (model.pkl) is used later for inference.


---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/LamQuC/Pend_Web-RCM_LLoan.git
2. Navigate to project directory
cd Pend_Web-RCM_LLoan
3. Configure database

Create a database and update configuration settings:

DB_NAME=loan_db
DB_USER=root
DB_PASSWORD=your_password
4. Run the application

Using Maven:

mvn spring-boot:run
🚀 Usage

Start the server and open your browser:

http://localhost:8080

Users can:

Submit loan requests

View loan records

Track loan status

Manage loan information

📈 Future Improvements

Improve UI/UX design

Implement role-based access control

Add analytics and reporting

Improve system security

Add REST API integration
