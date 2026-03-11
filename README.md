Pend_Web-RCM_LLoan
📌 Project Overview

Pend_Web-RCM_LLoan is a web-based application designed to support the loan request and management workflow.

The system allows users to submit loan requests, track loan status, and manage loan records through a web interface.
It demonstrates the implementation of a typical multi-layer web application architecture including presentation, business logic, and data persistence.

This project was developed for learning and practicing web backend development and database integration.

✨ Key Features

📄 Submit and manage loan requests

🔍 Track loan processing status

👤 User authentication and management

🗄️ Store and retrieve loan data from database

🌐 Web interface for interacting with the system

⚙️ Backend processing for loan operations

🏗️ System Architecture

The system follows a 3-tier architecture:

Client (Browser)
        │
        ▼
Application Server (Backend)
        │
        ▼
Database
Components

Frontend

User interface

Forms for loan submission

Display loan information

Backend

Business logic

Request processing

Communication with database

Database

Stores loan records

Stores user information

Maintains application data

🛠️ Tech Stack
Layer	Technology
Backend	Java / Spring Boot
Frontend	HTML, CSS, JavaScript
Database	MySQL
Build Tool	Maven
Version Control	Git, GitHub
📂 Project Structure
Pend_Web-RCM_LLoan
│
├── src/
│   ├── controller/      # Handle HTTP requests
│   ├── service/         # Business logic
│   ├── repository/      # Database access layer
│   └── model/           # Data models
│
├── resources/           # Configuration files
│
├── web/
│   ├── css/
│   ├── js/
│   └── templates/
│
├── database/            # SQL scripts
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/LamQuC/Pend_Web-RCM_LLoan.git
2️⃣ Navigate to the project folder
cd Pend_Web-RCM_LLoan
3️⃣ Configure database

Create a database and update configuration:

DB_NAME=loan_db
DB_USER=root
DB_PASSWORD=your_password
4️⃣ Run the application

Using Maven:

mvn spring-boot:run
🚀 Usage

After starting the server, open:

http://localhost:8080

Users can:

Submit loan requests

View loan records

Track loan status

Manage loan data

📈 Future Improvements

Improve UI/UX design

Implement role-based access control

Add reporting dashboard

Improve system security

Provide REST API integration
