def generate_llm_response(query: str, context: str = "", custom_prompt: str = "") -> str:
    """
    Temporary offline stub implementation.

    This version **does not call any external LLM API** so that the
    application can be demoed without an OpenAI key.
    It simply echoes back the query and (optionally) the retrieved context.

    To restore real LLM behaviour later, re‑implement this function to call
    OpenAI / Gemini etc.
    """

    parts = []

    if custom_prompt:
        parts.append(f"Prompt instructions: {custom_prompt.strip()}")

    parts.append(f"User question: {query.strip()}")

    if context:
        parts.append("Context used from KnowledgeBase:")
        # Truncate very long context for readability
        snippet = context.strip()
        if len(snippet) > 800:
            snippet = snippet[:800] + "... [truncated]"
        parts.append(snippet)

    parts.append(
        "Temporary demo answer: this is a mocked response generated without any real LLM. "
        "In a real deployment, this would be replaced by an OpenAI / Gemini response."
    )

    return "\n\n".join(parts)
