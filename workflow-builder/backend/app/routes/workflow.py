from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

from app.services.chroma_service import query_context
from app.services.llm_service import generate_llm_response

router = APIRouter()


class Edge(BaseModel):
    source: str
    target: str


class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any] = {}


class WorkflowRunRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
    query: str


@router.post("/workflow/run")
def run_workflow(payload: WorkflowRunRequest):
    nodes_map = {n.id: n for n in payload.nodes}

    start_node = next((n for n in payload.nodes if n.type == "userQuery"), None)
    if not start_node:
        return {"error": "Missing UserQuery node"}

    current_id = start_node.id
    visited = set()
    context = ""

    while current_id and current_id not in visited:
        visited.add(current_id)
        current_node = nodes_map[current_id]

        if current_node.type == "knowledgeBase":
            top_k = int(current_node.data.get("topK", 3))
            context = query_context(payload.query, top_k=top_k)

        if current_node.type == "llmEngine":
            prompt = current_node.data.get("prompt", "")
            use_context = current_node.data.get("useContext", True)
            final_context = context if use_context else ""
            answer = generate_llm_response(payload.query, final_context, prompt)
            return {"answer": answer, "context": final_context}

        next_edge = next((e for e in payload.edges if e.source == current_id), None)
        current_id = next_edge.target if next_edge else None

    return {"error": "Workflow did not reach LLM Engine"}
