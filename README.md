# AI Research Agent

An AI-powered research assistant that takes a research topic and generates a structured research response using Google's Gemini AI.

## 🚀 Features

* Enter any research topic through the web interface
* AI-powered research generation
* FastAPI backend
* React + Vite frontend
* Gemini API integration
* REST API communication between frontend and backend
* Clean and simple user interface
* CORS support for frontend-backend communication

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Python
* FastAPI
* Uvicorn
* Google Gemini API

## 📁 Project Structure

```text
AI-Research-Agent/
│
├── backend/
│   ├── main.py
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── README.md
└── ...
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd AI-Research-Agent
```

### 2. Backend Setup

Open a terminal and navigate to the backend:

```powershell
cd backend
```

Create and activate a virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Install the required dependencies:

```powershell
pip install -r requirements.txt
```

Set your Gemini API key.

For PowerShell:

```powershell
$env:GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

Start the backend:

```powershell
uvicorn main:app --reload
```

The backend will normally run at:

```text
http://127.0.0.1:8000
```

## 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open the local URL shown by Vite in your browser.

## 🔑 Environment Variables

The backend requires a Gemini API key.

Do not upload your API key to GitHub.

Use an environment variable such as:

```text
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Never commit real API keys, passwords, or other secrets to the repository.

## 🔄 How It Works

```text
User enters research topic
          ↓
React Frontend
          ↓
FastAPI Backend
          ↓
Google Gemini API
          ↓
AI-generated research response
          ↓
Frontend displays the result
```

## 🎯 Example

Enter a topic such as:

```text
Latest developments in Artificial Intelligence
```

The application sends the topic to the backend, which uses Gemini to generate the research response and returns the result to the frontend.

## 📌 Project Status

The project currently includes:

* React frontend
* FastAPI backend
* Gemini API integration
* Frontend-backend connection
* Research generation functionality

Further improvements can include:

* Research source citations
* Search engine integration
* PDF report generation
* Research history
* User authentication
* Improved AI research workflows

## 👨‍💻 Author

Gunjan Gohatre

B.E. Information Technology
Sipna College of Engineering & Technology
