# Pend_Web-RCM_LLoan

## 📌 Overview

**Pend_Web-RCM_LLoan** is a web-based system designed to support the **loan request and management workflow**.

The application allows users to submit loan requests, track loan processing status, and manage loan records through a web interface.  
This project demonstrates the implementation of a **multi-layer web architecture**, including frontend, backend, and database integration.

---

## ✨ Features

- Submit and manage loan requests
- Track loan approval status
- User authentication and management
- Store and manage loan data
- Web interface for interacting with the system

---

## 🏗 System Architecture

The system follows a typical **3-tier architecture**:
Client (Browser)
│
▼
Application Server (Backend)
│
▼
Database

---

## 🛠 Tech Stack

| Layer | Technology |
|------|------------|
| Backend | Java / Spring Boot |
| Frontend | HTML, CSS, JavaScript |
| Database | MySQL |
| Build Tool | Maven |
| Version Control | Git, GitHub |

---

## 📂 Project Structure
Pend_Web-RCM_LLoan
│
├── src
│ ├── controller
│ ├── service
│ ├── repository
│ └── model
│
├── resources
│
├── web
│ ├── css
│ ├── js
│ └── templates
│
├── database
│
└── README.md

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
