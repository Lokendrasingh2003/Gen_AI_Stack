import React from "react";

export default function LogsPanel({ logs }) {
  return (
    <div
      style={{
        height: 120,
        borderTop: "1px solid #e5e7eb",
        background: "#0b1220",
        color: "white",
        padding: 10,
        overflowY: "auto",
        fontSize: 12
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Execution Logs</div>
      {logs.length === 0 ? (
        <div style={{ color: "#94a3b8" }}>No logs yet...</div>
      ) : (
        logs.map((l, i) => (
          <div key={i} style={{ color: "#cbd5e1", marginBottom: 4 }}>
            {l}
          </div>
        ))
      )}
    </div>
  );
}
