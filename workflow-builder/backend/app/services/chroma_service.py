import uuid
import chromadb
import os

CHROMA_HOST = os.getenv("CHROMA_HOST", "localhost")
CHROMA_PORT = int(os.getenv("CHROMA_PORT", "8001"))

client = chromadb.HttpClient(host=CHROMA_HOST, port=CHROMA_PORT)
collection = client.get_or_create_collection("kb_docs")


def chunk_text(text: str, chunk_size=800):
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunk = text[i:i + chunk_size].strip()
        if chunk:
            chunks.append(chunk)
    return chunks


def upsert_document(filename: str, text: str):
    doc_id = str(uuid.uuid4())
    chunks = chunk_text(text)

    ids = [f"{doc_id}_{i}" for i in range(len(chunks))]
    metadatas = [{"filename": filename, "chunk": i, "doc_id": doc_id} for i in range(len(chunks))]

    collection.add(
        documents=chunks,
        ids=ids,
        metadatas=metadatas
    )
    return doc_id


def query_context(query: str, top_k=3) -> str:
    results = collection.query(query_texts=[query], n_results=top_k)
    docs = results.get("documents", [[]])[0]
    return "\n\n".join(docs)
