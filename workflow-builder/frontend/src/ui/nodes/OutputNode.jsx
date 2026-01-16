import React from "react";
import { Handle, Position } from "reactflow";

export default function OutputNode() {
  return (
    <div style={card}>
      <Handle type="target" position={Position.Left} />
      <div style={title}>💬 Output</div>
      <div style={desc}>Final chat response</div>
    </div>
  );
}

const card = {
  padding: 12,
  borderRadius: 14,
  background: "white",
  border: "1px solid #e5e7eb",
  width: 200
};

const title = { fontWeight: 800, marginBottom: 6 };
const desc = { fontSize: 12, color: "#6b7280" };
