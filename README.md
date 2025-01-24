# DS FullStack Developer Take-Home Assignment

This repository contains a simple chatbot application built with a **React frontend** and a **Python backend** using FastAPI. The chatbot provides responses to user inputs using predefined responses.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Submission Guidelines](#submission-guidelines)

---

## Features

### React Frontend
- **Chat interface**:
  - Message history display
  - Input field for messages
  - Send button
  - Responsive design using **Tailwind CSS**
  
### Python Backend
- **Endpoints**:
  - `GET http://localhost:8000/api/health-check`: Health check endpoint
  - `POST http://localhost:8000/api/chat`: Accepts a user message and returns a predefined response.


---

## Technologies Used
- **Frontend**:
  - React (Create React App)
  - Tailwind CSS

- **Backend**:
  - Python
  - FastAPI
  - Uvicorn (for running the server)
  - Docker

---

## Setup Instructions

### Prerequisites
- Node.js (for frontend)
- Docker

---
Note: If you use docker setup no need for any other installation just run the following commnds
### Docker Setup
1. In Chatbot directory Run the Follwing commands:
   ```bash
   docker compose build
2. Next Run following command
   ```bash
   docker compose up



### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
2. Run follwing command
   ```bash
   npm install
3. Navigate to the frontend directory:
   ```bash
   npm run dev
4. open browser and enter this url:
   ```bash
   http://localhost:5173/
### Backend Setup

1. In backend directory Run the Follwing commands:
   ```bash
   pip install -r requirements.txt
2. Next Run following command
   ```bash
  uvicorn main:app --reload
