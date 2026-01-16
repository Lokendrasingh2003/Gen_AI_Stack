import React from "react";

export default function Sidebar({ onAddNode }) {
  return (
    <div
      style={{
        width: 240,
        borderRight: "1px solid #e5e7eb",
        padding: 14,
        background: "white"
      }}
    >
      <h3 style={{ marginBottom: 12 }}>Components</h3>

      <NodeButton title="User Query" desc="Start node" onClick={() => onAddNode("userQuery")} />
      <NodeButton title="KnowledgeBase" desc="PDF + embeddings" onClick={() => onAddNode("knowledgeBase")} />
      <NodeButton title="LLM Engine" desc="GPT response" onClick={() => onAddNode("llmEngine")} />
      <NodeButton title="Output" desc="Chat UI" onClick={() => onAddNode("output")} />

      <div style={{ marginTop: 18, fontSize: 12, color: "#6b7280" }}>
        Tip: Add nodes → connect them → Build Stack → Chat.
      </div>
    </div>
  );
}

function NodeButton({ title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: 12,
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        background: "#f9fafb",
        cursor: "pointer",
        marginBottom: 10
      }}
    >
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{desc}</div>
    </button>
  );
}
