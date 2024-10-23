import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  Handle,
  Position,
  useReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Sidebar to add nodes
const SidebarComponent = () => {
  const [nodeLabel, setNodeLabel] = useState("default");
  const { setNodes } = useReactFlow();

  return (
    <div>
      <h5>Sidebar</h5>
      <input
        onChange={(e) => setNodeLabel(e.target.value)}
        placeholder="Node label"
        value={nodeLabel}
      />
      <button
        onClick={() => {
          if (nodeLabel.trim()) {
            setNodes((prev) => [
              ...prev,
              {
                id: `node-${Date.now()}`,
                position: { x: Math.random() * 400, y: Math.random() * 400 },
                data: { label: nodeLabel },
                type: "customNode", // Make sure type is always customNode
              },
            ]);
            setNodeLabel(""); // Clear input after adding
          }
        }}
      >
        Add Node
      </button>
    </div>
  );
};

// Custom Node with visible handles
const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: "10px", border: "1px solid black", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
      <div style={{ backgroundColor: "pink", color: "blue" }}>
        {data.label}
      </div>
      {/* Handles for source 'b' and 'c' */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ background: "red", left: "25%" }} // Make handle visible
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        style={{ background: "green", left: "75%" }} // Make handle visible
      />
      {/* Target handle */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "blue" }} // Make target handle visible
      />
    </div>
  );
};

const FlowComponent = () => {
  const [backgroundVariant, setBackgroundVarient] = useState("lines");
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const nodeTypes = { customNode: CustomNode }; // Define customNode type

  // Initial nodes and edges
  const initialNodes = [
    {
      id: "node-1",
      type: "customNode", // Ensure the type is 'customNode'
      position: { x: 100, y: 100 },
      data: { label: "node-1" },
    },
    {
      id: "node-2",
      type: "customNode", // Changed from 'output' to 'customNode'
      position: { x: 100, y: 250 },
      data: { label: "node-2" },
    },
    {
      id: "node-3",
      type: "customNode", // Changed from 'output' to 'customNode'
      position: { x: 300, y: 250 },
      data: { label: "node-3" },
    },
    {
      id: "node-4",
      type: "customNode", // Ensure the type is 'customNode'
      position: { x: 500, y: 250 },
      data: { label: "node-4" },
    },
  ];

  const initialEdges = [
    {
      id: "edge-1",
      source: "node-1",
      target: "node-4",
      sourceHandle: "c",
      type: "straight",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#FF0072",
      },
    },
    {
      id: "edge-2",
      source: "node-1",
      target: "node-3",
      sourceHandle: "b",
      type: "straight",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#FF0072",
      },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const connect = useCallback((connection) => {
    const edge = { ...connection, animated: true, id: Date.now() };
    setEdges((prev) => addEdge(edge, prev));
  }, []);

  return (
    <div className="flow_wrapper" style={{ height: "500px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={connect}
        nodeTypes={nodeTypes}
      >
        <Background variant={backgroundVariant} gap={"10"} />
        <Panel>
          <button onClick={() => setBackgroundVarient("dots")}>dots</button>
          <button
            style={{ margin: "0 10px" }}
            onClick={() => setBackgroundVarient("lines")}
          >
            lines
          </button>
          <button onClick={() => setBackgroundVarient("cross")}>cross</button>
        </Panel>
        <Controls showFitView={true} />
        <Panel position="bottom-right">
          <button onClick={() => zoomIn({ duration: 800 })}>zoom in</button>
          <button
            style={{ margin: "0 10px" }}
            onClick={() => zoomOut({ duration: 800 })}
          >
            zoom out
          </button>
          <button onClick={() => fitView({ duration: 800 })}>Fit view</button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "100px" }}>
        <SidebarComponent />
      </div>
      <FlowComponent />
    </div>
  </ReactFlowProvider>
);


