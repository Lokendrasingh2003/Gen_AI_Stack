from fastapi import APIRouter, UploadFile, File
from app.services.pdf_extractor import extract_text_from_pdf
from app.services.chroma_service import upsert_document

router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text_from_pdf(content)
    doc_id = upsert_document(file.filename, text)
    return {"doc_id": doc_id, "filename": file.filename}
