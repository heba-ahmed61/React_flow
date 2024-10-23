import React, { useState, useCallback } from 'react';
import {
    ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Customer Payment' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Payment Gateway' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Fraud Detection' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Bank Processing' }, position: { x: 100, y: 200 } },
  { id: '5', type: 'output', data: { label: 'Transaction Success' }, position: { x: 250, y: 300 } },
  { id: '6', type: 'output', data: { label: 'Transaction Failed' }, position: { x: 500, y: 300 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4-success', source: '3', target: '4', label: 'Pass', style: { stroke: 'green' }, animated: true },
  { id: 'e3-6-failure', source: '3', target: '6', label: 'Fail', style: { stroke: 'red' }, animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
];

function Sidebar({ onDragStart }) {
  return (
    <aside>
      <div className="description">Drag and drop nodes into the flow</div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
      >
        Customer Payment
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
      >
        Payment Gateway
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
      >
        Fraud Detection
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
      >
        Transaction Success
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
      >
        Transaction Failed
      </div>
    </aside>
  );
}

const MyFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const onInit = (instance) => {
    setReactFlowInstance(instance);
  };
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY,
      });
      const type = event.dataTransfer.getData('application/reactflow');

      const newNode = {
        id: (nodes.length + 1).toString(),
        type,
        position: reactFlowBounds,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, nodes.length]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <ReactFlowProvider>
        <div className="dndflow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <Sidebar onDragStart={onDragStart} />
    </div>
    </ReactFlowProvider>
  );
};
export default MyFlow