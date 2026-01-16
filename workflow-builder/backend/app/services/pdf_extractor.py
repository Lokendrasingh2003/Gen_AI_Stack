import fitz  # PyMuPDF
from io import BytesIO


def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    text = ""
    with fitz.open(stream=BytesIO(pdf_bytes), filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text.strip()
