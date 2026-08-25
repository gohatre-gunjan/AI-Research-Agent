import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

app = FastAPI(title="ResearchAI Backend")


# --------------------------------------------------
# CORS CONFIGURATION
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ai-research-agent-7t34zbwaf-gunjan-projects.vercel.app",
    ],
    allow_origin_regex=r"https://ai-research-agent-[a-z0-9-]+\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# GEMINI CONFIGURATION
# --------------------------------------------------

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is not set")

client = genai.Client(api_key=api_key)


# --------------------------------------------------
# ROOT ENDPOINT
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "ResearchAI backend is running"
    }


# --------------------------------------------------
# RESEARCH ENDPOINT
# --------------------------------------------------

@app.post("/research")
def research(topic: str):

    response = client.models.generate_content(
        model="gemini-2.5-flash",

        contents=f"""
You are ResearchAI, an AI research assistant.

Research the following topic using current and reliable web information:

{topic}

Create a clear research report with:

1. Short Introduction
2. Key Points
3. Important Facts
4. Advantages and Disadvantages
5. Recent Developments
6. Short Conclusion

Use factual information and prioritize reliable sources.
Keep the explanation clear and easy to understand.
""",

        config=types.GenerateContentConfig(
            tools=[
                types.Tool(
                    google_search=types.GoogleSearch()
                )
            ]
        )
    )

    sources = []

    try:
        grounding_metadata = response.candidates[0].grounding_metadata

        if grounding_metadata and grounding_metadata.grounding_chunks:

            for chunk in grounding_metadata.grounding_chunks:

                if chunk.web:
                    sources.append({
                        "title": chunk.web.title,
                        "url": chunk.web.uri
                    })

    except Exception:
        pass

    return {
        "topic": topic,
        "status": "success",
        "result": response.text,
        "sources": sources
    }