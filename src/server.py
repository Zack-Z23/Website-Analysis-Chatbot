import requests
import json
import logging
import ollama
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    url: str
    question: str = "Analyze the website and provide information."

def format_response(raw_response):
    return raw_response.replace("1.", "\n\n1.").replace(".", ".\n").strip()

def generate_conversational_response(url: str, user_question: str) -> str:
    input_prompt = (
        "You are a helpful chatbot specializing in analyzing websites and answering questions. "
        "When a user provides a URL, analyze its content and respond conversationally to help with their query.\n\n"
        "If the user doesn't provide a specific query, generate an overview question about the website, followed by "
        "multiple-choice options relevant to the website's categories or content.\n\n"
        "Make sure to ask dynamic questions based on the user's input."
        f"Now analyze the URL '{url}' and respond to this question: '{user_question}'.\n"
    )

    try:
        response = ollama.generate(model="qwen2.5-coder:14b", prompt=input_prompt)
        logging.info(f"Raw Ollama Response: {response}")
        raw_response = response.get('response', '').strip()
        clean_response = re.sub(r'[^\x00-\x7F]+', '', raw_response) 
        return format_response(clean_response)

    except Exception as e:
        logging.error(f"Error generating response: {str(e)}")
        return "I'm sorry, I couldn't process that request. Please try again."


@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        if not request.url:
            raise HTTPException(status_code=400, detail="URL is required.")

        
        response = generate_conversational_response(request.url, request.question)
        return {"response": response}

    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="An internal server error occurred.")


@app.get("/")
async def home():
    return {"message": "Welcome to the AI Content Categorization Chatbot API"}
