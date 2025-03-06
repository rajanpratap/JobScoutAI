from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import shutil
import os

# Initialize FastAPI application
app = FastAPI(
    title="JobScoutAI Python Service",
    description="Service for resume parsing, job scraping, and future LLM integration. Called by the Java Spring Boot backend.",
    version="0.1",
)

# Optional: Enable CORS if you need cross-origin requests during development.
# For server-to-server communication (Java backend to Python service), CORS may not be necessary.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed or remove for internal services.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to temporarily store uploaded resumes
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "JobScoutAI Python Service is running"}

@app.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    """
    Endpoint to receive a resume file from the Java backend.
    This endpoint saves the file, processes it to extract skills (placeholder),
    and scrapes job listings (placeholder). Future integration with LLMs/OpenAI models
    can be added where indicated.
    """
    try:
        # Save the uploaded file
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")
    
    # TODO: Integrate your resume parsing logic here
    # For now, we simulate extracted skills with dummy data.
    resume_data = {"skills": ["Python", "FastAPI", "Web Scraping"]}

    # TODO: Integrate your job scraping logic based on extracted skills here.
    # For demonstration purposes, we return a dummy list of job links.
    job_links = [
        "https://example.com/job1",
        "https://example.com/job2",
    ]

    # TODO: Optionally integrate LLM/OpenAI processing here.
    # e.g., llm_response = process_with_llm(resume_data)

    # Prepare the JSON response for the Java backend
    return {
        "message": "Resume processed successfully",
        "filename": file.filename,
        "skills_extracted": resume_data["skills"],
        "job_links": job_links,
        # "llm_response": llm_response,  # Uncomment when integrated
    }

if __name__ == "__main__":
    # Run the app on port 5000. This port should be referenced in your Java backend.
    uvicorn.run("src.main:app", host="0.0.0.0", port=5000, reload=True)
