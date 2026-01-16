import React, { useState } from "react";

export default function ChatModal({ workflow, onClose, addLog }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const send = async () => {
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    addLog(`Chat query: ${query}`);

    const res = await fetch("http://localhost:8000/api/workflow/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...workflow, query })
    });

    const data = await res.json();
    const answer = data.answer || data.error || "No response";

    setMessages((prev) => [...prev, { role: "bot", text: answer }]);
    addLog("LLM response generated ✅");

    setQuery("");
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>Chat with Stack</h3>
          <button onClick={onClose} style={closeBtn}>
            ✖
          </button>
        </div>

        <div style={chatBox}>
          {messages.length === 0 ? (
            <div style={{ color: "#6b7280", fontSize: 13 }}>Ask your first question...</div>
          ) : (
            messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <b>{m.role === "user" ? "You" : "Bot"}:</b> {m.text}
              </div>
            ))
          )}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type your question..." style={input} />
          <button onClick={send} style={sendBtn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modal = {
  width: 560,
  background: "white",
  borderRadius: 14,
  padding: 14
};

const chatBox = {
  height: 320,
  overflowY: "auto",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 10,
  marginTop: 12,
  marginBottom: 12
};

const input = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  border: "1px solid #e5e7eb"
};

const sendBtn = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer"
};

const closeBtn = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 16
};
