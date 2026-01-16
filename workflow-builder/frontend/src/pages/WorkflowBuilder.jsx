import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from "reactflow";

import Sidebar from "../ui/Sidebar";
import ConfigPanel from "../ui/ConfigPanel";
import ChatModal from "../ui/ChatModal";
import LogsPanel from "../ui/LogsPanel";

import UserQueryNode from "../ui/nodes/UserQueryNode";
import KnowledgeBaseNode from "../ui/nodes/KnowledgeBaseNode";
import LLMEngineNode from "../ui/nodes/LLMEngineNode";
import OutputNode from "../ui/nodes/OutputNode";

const initialNodes = [];
const initialEdges = [];

export default function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNode, setSelectedNode] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  const nodeTypes = useMemo(
    () => ({
      userQuery: UserQueryNode,
      knowledgeBase: KnowledgeBaseNode,
      llmEngine: LLMEngineNode,
      output: OutputNode
    }),
    []
  );

  const addLog = (msg) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    addLog(`Connected ${params.source} → ${params.target}`);
  }, []);

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const createNode = (type) => {
    const id = `${type}_${Date.now()}`;

    const base = {
      id,
      position: { x: 200, y: 100 + nodes.length * 90 },
      type,
      data: { label: type, type }
    };

    if (type === "userQuery") base.data = { label: "User Query", type };
    if (type === "knowledgeBase") base.data = { label: "KnowledgeBase", type, topK: 3 };
    if (type === "llmEngine") base.data = { label: "LLM Engine", type, prompt: "", useContext: true };
    if (type === "output") base.data = { label: "Output", type };

    setNodes((prev) => [...prev, base]);
    addLog(`Added node: ${type}`);
  };

  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setLogs([]);
  };

  const validateWorkflow = () => {
    const types = nodes.map((n) => n.type);

    if (!types.includes("userQuery")) return "Missing User Query node";
    if (!types.includes("llmEngine")) return "Missing LLM Engine node";
    if (!types.includes("output")) return "Missing Output node";
    if (edges.length === 0) return "No connections found. Please connect nodes.";

    return null;
  };

  const buildStack = () => {
    const err = validateWorkflow();
    if (err) {
      addLog(`❌ Build failed: ${err}`);
      alert(err);
      return;
    }
    addLog("✅ Stack validated successfully");
    alert("Stack is valid ✅ Now you can chat!");
  };

  const exportWorkflowPayload = () => {
    return {
      nodes: nodes.map((n) => ({ id: n.id, type: n.type, data: n.data })),
      edges: edges.map((e) => ({ source: e.source, target: e.target }))
    };
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: "1px solid #e5e7eb",
            background: "#ffffff"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 18 }}>⚡ AI PLANET</div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={buildStack} style={btnPrimary}>
              Build Stack
            </button>
            <button onClick={() => setChatOpen(true)} style={btnSecondary} disabled={nodes.length === 0}>
              Chat with Stack
            </button>
            <button onClick={clearCanvas} style={btnDanger}>
              Clear
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex" }}>
          <Sidebar onAddNode={createNode} />

          <div style={{ flex: 1, background: "#f8fafc" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
            >
              <MiniMap />
              <Controls />
              <Background gap={16} />
            </ReactFlow>
          </div>

          <ConfigPanel selectedNode={selectedNode} setNodes={setNodes} nodes={nodes} addLog={addLog} />
        </div>

        <LogsPanel logs={logs} />

        {chatOpen && <ChatModal onClose={() => setChatOpen(false)} workflow={exportWorkflowPayload()} addLog={addLog} />}
      </div>
    </ReactFlowProvider>
  );
}

const btnPrimary = {
  background: "#2563eb",
  color: "white",
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer"
};

const btnSecondary = {
  background: "#111827",
  color: "white",
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer"
};

const btnDanger = {
  background: "#ef4444",
  color: "white",
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer"
};
