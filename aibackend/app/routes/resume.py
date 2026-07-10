from fastapi import APIRouter, UploadFile, File, Form
import os
import shutil
from app.services.ai_services import analyze_resume
from app.services.pdf_services import extract_text_from_pdf
router = APIRouter()


# @router.post("/upload")
# async def upload_resume(
#     resume: UploadFile = File(...),
#     job_description: str = Form(...)
# ):

#     os.makedirs("uploads", exist_ok=True)

#     file_path = f"uploads/{resume.filename}"

#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(resume.file, buffer)

#     resume_text = extract_text_from_pdf(file_path)

#     return {
#         "resume_text": resume_text,
#         "job_description": job_description
#     }


@router.post("/analyze")
async def analyze_resume_api(
    resume: UploadFile = File(...),
    jd: str = Form(...)
):

    upload_dir = "uploads"

    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, resume.filename)

    contents = await resume.read()

    with open(file_path, "wb") as f:
        f.write(contents)

    resume_text = extract_text_from_pdf(file_path)

    result = analyze_resume(
        resume_text,
        jd
    )

    return result