# AI Website Analyzer Chatbot API

A FastAPI-powered chatbot that analyzes websites and answers questions about them using a local Ollama LLM (`qwen2.5-coder:14b`).

---

## Features

- Accepts a URL and a natural language question
- Uses Ollama to analyze the website and generate a conversational response
- Returns structured, readable answers
- CORS-enabled for easy frontend integration

---

## Requirements

- Python 3.9+
- [Ollama](https://ollama.com/) installed and running locally
- The `qwen2.5-coder:14b` model pulled in Ollama

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**
   ```bash
   pip install fastapi uvicorn ollama requests
   ```

3. **Pull the Ollama model**
   ```bash
   ollama pull qwen2.5-coder:14b
   ```

4. **Start the Ollama server** (if not already running)
   ```bash
   ollama serve
   ```

---

## Running the API

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

---

## API Endpoints

### `GET /`
Health check — returns a welcome message.

**Response:**
```json
{ "message": "Welcome to the AI Content Categorization Chatbot API" }
```

---

### `POST /chat`
Analyzes a website and answers a question about it.

**Request body:**
```json
{
  "url": "https://example.com",
  "question": "What does this website sell?"
}
```

| Field      | Type   | Required | Default                                        |
|------------|--------|----------|------------------------------------------------|
| `url`      | string |  Yes   | —                                              |
| `question` | string |  No    | `"Analyze the website and provide information."` |

**Response:**
```json
{
  "response": "This website appears to be an e-commerce platform that sells..."
}
```

**Error responses:**

| Status | Reason                        |
|--------|-------------------------------|
| `400`  | URL not provided              |
| `500`  | Internal server error / model failure |

---

## Example Usage

Using `curl`:
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"url": "https://news.ycombinator.com", "question": "What kind of content is on this site?"}'
```

Using Python `requests`:
```python
import requests

res = requests.post("http://localhost:8000/chat", json={
    "url": "https://news.ycombinator.com",
    "question": "What kind of content is on this site?"
})
print(res.json()["response"])
```

---

## Project Structure

```
.
├── main.py        # FastAPI app and Ollama integration
└── README.md
```

---

## Notes

- The model does **not** fetch or scrape the URL — it reasons about the website based on its training knowledge. For live scraping, consider integrating a tool like `BeautifulSoup` or `playwright` to pass page content into the prompt.
- Non-ASCII characters are stripped from the model's response to ensure clean output.
- CORS is currently open (`allow_origins=["*"]`). Restrict this in production.

---

## License

MIT
