from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.resume import router as resume_router

app = FastAPI(
    title="AI Resume Coach"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    resume_router,
    prefix="/api/resume",
    tags=["Resume"]
)


@app.get("/")
def home():
    return {
        "message": "AI Resume Coach Running"
    }