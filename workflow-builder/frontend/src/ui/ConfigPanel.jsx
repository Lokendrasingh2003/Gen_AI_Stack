import React, { useEffect, useState } from "react";

export default function ConfigPanel({ selectedNode, nodes, setNodes, addLog }) {
  const [data, setData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    if (selectedNode) setData(selectedNode.data);
    else setData(null);
  }, [selectedNode]);

  const updateNodeData = (key, value) => {
    if (!selectedNode) return;

    const updated = { ...data, [key]: value };
    setData(updated);

    setNodes((prev) => prev.map((n) => (n.id === selectedNode.id ? { ...n, data: updated } : n)));
    addLog(`Updated ${selectedNode.type}: ${key} = ${value}`);
  };

  const uploadPDF = async (file) => {
    if (!file) return;

    try {
      setUploading(true);
      addLog(`Uploading PDF: ${file.name}`);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData
      });

      const result = await res.json();

      if (result.doc_id) {
        addLog(`✅ PDF uploaded successfully (doc_id: ${result.doc_id})`);
        setUploadedFile(file.name);
        updateNodeData("docId", result.doc_id);
      } else {
        addLog("❌ Upload failed");
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      addLog("❌ Upload error");
      alert("Upload error. Check backend logs.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        width: 320,
        borderLeft: "1px solid #e5e7eb",
        padding: 14,
        background: "white"
      }}
    >
      <h3 style={{ marginBottom: 12 }}>Configuration</h3>

      {!selectedNode && <div style={{ fontSize: 13, color: "#6b7280" }}>Select a node to configure it ⚙️</div>}

      {selectedNode && (
        <>
          <div style={{ fontSize: 13, marginBottom: 10 }}>
            <b>Node:</b> {selectedNode.type}
          </div>

          {selectedNode.type === "knowledgeBase" && (
            <>
              <label style={labelStyle}>Top K Results</label>
              <input
                type="number"
                value={data?.topK ?? 3}
                onChange={(e) => updateNodeData("topK", Number(e.target.value))}
                style={inputStyle}
              />
              <div style={helpStyle}>Retrieves Top K chunks from ChromaDB.</div>

              <label style={labelStyle}>Upload PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => uploadPDF(e.target.files?.[0])}
                style={inputStyle}
                disabled={uploading}
              />

              <div style={helpStyle}>
                {uploading ? "Uploading..." : uploadedFile ? `Uploaded: ${uploadedFile}` : "Upload a PDF to store embeddings."}
              </div>

              {data?.docId && (
                <div style={{ marginTop: 8, fontSize: 12 }}>
                  <b>Doc ID:</b> {data.docId}
                </div>
              )}
            </>
          )}

          {selectedNode.type === "llmEngine" && (
            <>
              <label style={labelStyle}>Custom Prompt</label>
              <textarea
                value={data?.prompt ?? ""}
                onChange={(e) => updateNodeData("prompt", e.target.value)}
                style={{ ...inputStyle, height: 90 }}
              />

              <label style={{ ...labelStyle, display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={data?.useContext ?? true}
                  onChange={(e) => updateNodeData("useContext", e.target.checked)}
                />
                Use KnowledgeBase Context
              </label>
            </>
          )}

          {selectedNode.type === "userQuery" && <div style={helpStyle}>This is the entry point of workflow.</div>}
          {selectedNode.type === "output" && <div style={helpStyle}>This shows final response in chat.</div>}
        </>
      )}
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 12,
  color: "#374151",
  fontWeight: 700,
  marginTop: 10,
  marginBottom: 6
};

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  outline: "none"
};

const helpStyle = {
  fontSize: 12,
  color: "#6b7280",
  marginTop: 6
};
