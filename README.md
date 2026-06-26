# Website Analysis Chatbot

A full-stack AI-powered chatbot that analyzes the content of any website and lets you have a natural conversation about it. Enter a URL, and the app fetches and processes the site's content so you can ask questions and get intelligent answers — all through a clean React interface.

## Features

- **URL-based analysis** — paste any website URL to instantly load its content for querying
- **Conversational interface** — ask follow-up questions in a natural chat format
- **React frontend** — responsive, fast UI built with Create React App
- **Python backend** — handles web scraping, content processing, and AI response generation
- **Full-stack architecture** — clean separation between frontend (React/JS) and backend (Python)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, JavaScript, CSS |
| Backend | Python |
| Styling | CSS |

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python 3.x
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Zack-Z23/Website-Analysis-Chatbot.git
   cd Website-Analysis-Chatbot
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the App

Start the backend server:
```bash
python app.py
```

In a separate terminal, start the frontend:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Website-Analysis-Chatbot/
├── public/          # Static assets
├── src/             # React frontend source
├── app.py           # Python backend entry point
├── package.json
└── README.md
```

## Author

Zacharias Zachariadis — [GitHub](https://github.com/Zack-Z23)
