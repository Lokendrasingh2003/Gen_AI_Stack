import React from "react";
import { Handle, Position } from "reactflow";

export default function LLMEngineNode({ data }) {
  return (
    <div style={card}>
      <Handle type="target" position={Position.Left} />
      <div style={title}>🤖 LLM Engine</div>
      <div style={desc}>Use Context: {String(data.useContext ?? true)}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const card = {
  padding: 12,
  borderRadius: 14,
  background: "white",
  border: "1px solid #fee2e2",
  width: 200
};

const title = { fontWeight: 800, marginBottom: 6 };
const desc = { fontSize: 12, color: "#6b7280" };
