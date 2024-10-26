import React, { useRef, useCallback, useState, useContext } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  MiniMap,
  Background,
  Panel,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Sidebar from "./Sidebar";
import { DnDProvider, useDnD } from "./DnDContext";
import "./index.css";
import CustomNode from "./CustomNode";
import StartNode from "./CustomStartNode";
import ButtonEdge from './ButtonEdge';
import { NodesProvider } from "./NodeContext";
let id = 0;
const getId = () => `dndnode_${id++}`;
const DnDFlow = () => {
  const [backgroundVariant, setBackgroundVarient] = useState("dots");
  const nodeTypes = { CustomNode, StartNode };
  const edgeTypes = {ButtonEdge};
  const initialNodes = [
    {
      id: "1",
      type: "StartNode",
      data: { label: "Start" },
      position: { x: window.innerWidth / 2.5, y: 50 },
    },
  ];
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [nodeLabel, setNodeLabel] = useState(null);
  const [editNode, setEditNode] = useState(null);
  const [type] = useDnD();
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        position,
        data: { 
          label: `${type}`, 
          icon: `${type}`, 
        },
        type: "CustomNode",
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );
  const onSubmit = (e) => {
    e.preventDefault();
    if (!editNode) {
      if (nodeLabel.trim()) {  
        setNodes((prev) => [
          ...prev,
          {
            id: `node-${Date.now()}`,
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { label: nodeLabel},
            type: "CustomNode",
          },
        ]);
        
      }
      setNodeLabel("");
    } else {
      const updatedNodes = nodes.map((node) =>
        node.id === editNode.id
          ? { ...editNode, data: { label: nodeLabel } }
          : node
      );
      setNodes(updatedNodes);
      setEditNode(null);
      setNodeLabel("");
    }
  };
  const connect = useCallback((connection) => {
    const edge = {
      ...connection,
      animated: true,
      type: 'ButtonEdge',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#636670",
      },
      id: Date.now().toString(),
    };
    setEdges((prev) => addEdge(edge, prev));
  }, []);
  return (
   <NodesProvider nodes={nodes} setNodes={setNodes}>
     <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={connect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          // onNodeClick={(e, val) => {
          //   if (val) {
          //     setNodeLabel(val?.data?.label);
          //       setEditNode(val);
          //   }
          // }}
          onNodeClick={(e, val) => {
            if (val) {
              const isTitleClick = e.target.classList.contains('node_title');
              if (isTitleClick) {
                setNodeLabel(val?.data?.label);
                setEditNode(val);
              }
            }
          }}
        >
          <Background variant={backgroundVariant} gap={10} color="#cdced1" />
          <Panel position="bottom-right">
            <div className="controllers_btns">
              <button onClick={() => zoomIn({ duration: 800 })}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#186ed1"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                  />
                </svg>
              </button>
              <button
                onClick={() => zoomOut({ duration: 800 })}
                style={{ margin: "0 10px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#186ed1"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
                  />
                </svg>
              </button>
              <button onClick={() => fitView({ duration: 800 })}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#186ed1"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </button>
            </div>
          </Panel>
           <MiniMap position="bottom-left"/> 
           <Panel position="top-left">
          <div className="controllers_btns">
          <button className={backgroundVariant == 'dots' && "active-bg"} onClick={() => setBackgroundVarient("dots")}>BG1</button>
          <button
            style={{ margin: "0 5px" }}
            onClick={() => setBackgroundVarient("lines")}
            className={backgroundVariant == 'lines' && "active-bg"}
          >
            BG2
          </button>
          <button  className={backgroundVariant == 'cross' && "active-bg"} onClick={() => setBackgroundVarient("cross")}>BG3</button>
          </div>
        </Panel>
        </ReactFlow>
      </div>
      <Sidebar
        onSubmit={onSubmit}
        nodeLabel={nodeLabel}
        setNodeLabel={setNodeLabel}
        editNode={editNode}
        setEditNode={setEditNode}
        allNodes={nodes}
        setNodes={setNodes}
      />
    </div>
   </NodesProvider>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
