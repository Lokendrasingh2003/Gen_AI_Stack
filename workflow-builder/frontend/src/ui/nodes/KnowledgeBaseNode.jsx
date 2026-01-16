import React from "react";
import { Handle, Position } from "reactflow";

export default function KnowledgeBaseNode({ data }) {
  return (
    <div style={card}>
      <Handle type="target" position={Position.Left} />
      <div style={title}>📚 KnowledgeBase</div>
      <div style={desc}>TopK: {data.topK ?? 3}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const card = {
  padding: 12,
  borderRadius: 14,
  background: "white",
  border: "1px solid #dcfce7",
  width: 200
};

const title = { fontWeight: 800, marginBottom: 6 };
const desc = { fontSize: 12, color: "#6b7280" };
