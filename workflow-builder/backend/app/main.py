from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.workflow import router as workflow_router
from app.routes.upload import router as upload_router

app = FastAPI(title="Workflow Builder Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workflow_router, prefix="/api")
app.include_router(upload_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Backend running ✅"}
