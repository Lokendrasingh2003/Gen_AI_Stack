import React from "react";
import { Handle, Position } from "reactflow";

export default function UserQueryNode() {
  return (
    <div style={card}>
      <div style={title}>🟦 User Query</div>
      <div style={desc}>Entry point for user question</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const card = {
  padding: 12,
  borderRadius: 14,
  background: "white",
  border: "1px solid #dbeafe",
  width: 200
};

const title = { fontWeight: 800, marginBottom: 6 };
const desc = { fontSize: 12, color: "#6b7280" };
