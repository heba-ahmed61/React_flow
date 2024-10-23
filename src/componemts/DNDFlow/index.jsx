import React, { useRef, useCallback, useState } from 'react';
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
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';
import './index.css';
import CustomNode from './CustomNode';
import StartNode from './CustomStartNode';
// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: 'User' } },
//   { id: '2', position: { x: 200, y: 0 }, data: { label: 'Cart' } },
//   { id: '3', position: { x: 400, y: 0 }, data: { label: 'Checkout' } },
//   { id: '4', position: { x: 600, y: 0 }, data: { label: 'Payment Gateway' } },
//   { id: '5', position: { x: 800, y: 0 }, data: { label: 'Bank API' } },
//   { id: '6', position: { x: 1000, y: 0 }, data: { label: 'Payment Confirmation' } },
//   { id: '7', position: { x: 1200, y: 0 }, data: { label: 'Receipt' } },
// ];

// const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', label: 'Add items' },
//   { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', label: 'Proceed to Checkout' },
//   { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', label: 'Enter Payment Details' },
//   { id: 'e4-5', source: '4', target: '5', type: 'smoothstep', label: 'Send Payment Request' },
//   { id: 'e5-6', source: '5', target: '6', type: 'smoothstep', label: 'Bank Approval' },
//   { id: 'e6-7', source: '6', target: '7', type: 'smoothstep', label: 'Send Receipt' },
// ];

let id = 0;
const getId = () => `dndnode_${id++}`;
const DnDFlow = () => {
  const nodeTypes = { CustomNode, StartNode };
  // const initialNodes = [
  //   { id: '2', type: 'CustomNode', data: { label: 'User', icon: 'icon', sourceHandle: ['2'] }, position: { x: 520, y: 50 } },
  //   { id: '3', type: 'CustomNode', data: { label: 'Cart', icon: 'icon', sourceHandle: ['3'] }, position: { x: 520, y: 140 } },
  //   { id: '4', type: 'CustomNode', data: { label: 'Checkout', sourceHandle: ['4'] }, position: { x: 520, y: 230 } },
  //   { id: '5', type: 'CustomNode', data: { label: 'Payment Gateway', sourceHandle: ['5'] }, position: { x: 520, y: 320 } },
  //   { id: '6', type: 'CustomNode', data: { label: 'Payment Processor', sourceHandle: ['6'] }, position: { x: 520, y: 420 } },
  //   { id: '7', type: 'CustomNode', data: { label: 'Fraud Detection', sourceHandle: ['7'] }, position: { x: 520, y: 520 } },
  //   { id: '8', type: 'CustomNode', data: { label: 'IF/Else Condition', sourceHandle: ['8'] }, position: { x: 520, y: 620 } },
  //   { id: '9', type: 'CustomNode', data: { label: 'IF', sourceHandle: ['9'] }, position: { x: 300, y: 720 } },
  //   { id: '10', type: 'CustomNode', data: { label: 'Else', sourceHandle: ['10'] }, position: { x: 650, y: 720 } },
  //   { id: '11', type: 'CustomNode', data: { label: 'Bank Processing', sourceHandle: ['11'] }, position: { x: 520, y: 820 } },
  //   { id: '12', type: 'CustomNode', data: { label: 'Payment Confirmation',sourceHandle: ['12'] }, position: { x: 520, y: 920 } },
  //   { id: '13', type: 'CustomNode', data: { label: 'Transaction Success' }, position: { x: 300, y: 1020 } },
  //   { id: '14', type: 'CustomNode', data: { label: 'Transaction Failed' }, position: { x: 650, y: 1020 } },
  // ];
  
  // const initialEdges = [
  //   { id: 'e1-2', source: '2', target: '3', animated: true }, // User to Cart
  //   { id: 'e2-3', source: '3', target: '4', animated: true }, // Cart to Checkout
  //   { id: 'e3-4', source: '4', target: '5', animated: true }, // Checkout to Payment Gateway
  //   { id: 'e4-5', source: '5', target: '6', animated: true }, // Payment Gateway to Payment Processor
  //   { id: 'e5-6', source: '6', target: '7', animated: true }, // Payment Processor to Fraud Detection
  //   { id: 'e6-7', source: '7', target: '8', animated: true }, // Fraud Detection to IF/Else Condition
  //   { id: 'e7-8', source: '8', target: '9', animated: true }, // IF/Else Condition to IF
  //   { id: 'e7-9', source: '8', target: '10', animated: true }, // IF/Else Condition to Else
  //   { id: 'e8-10', source: '9', target: '11', animated: true }, // IF to Bank Processing
  //   { id: 'e10-11', source: '11', target: '12', animated: true }, // Bank Processing to Payment Confirmation
  //   { id: 'e11-12', source: '12', target: '12', animated: true }, // Payment Confirmation to Transaction Success
  //   { id: 'e9-13', source: '10', target: '13', animated: true }, // Else to Transaction Failed
  // ];
  const initialNodes = [
    { id: '1', type: 'StartNode', data: { label: 'Start'}, position: { x: 520, y: 50 } }
  ]
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
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
        type,
        position,
        data: { label: `${type}`, icon:`${type}`},
        type: 'CustomNode'
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );
console.log(nodes)
  const connect = useCallback((connection) => {
    const edge = { ...connection, animated: true,   markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#636670",
    } ,id: Date.now().toString() };
    setEdges((prev) => addEdge(edge, prev));
  }, []);

  const { zoomIn, zoomOut, fitView } = useReactFlow();
  
  const [nodeLabel, setNodeLabel] = useState('');
  const [editNode, setEditNode] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!editNode) {
      if (nodeLabel.trim()) {
        setNodes((prev) => [
          ...prev,
          {
            id: `node-${Date.now()}`,
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { label: nodeLabel },
            type: 'CustomNode'
            
          },
        ]);
        setNodeLabel('');
      }
    } else {
      const updatedNodes = nodes.map((node) =>
        node.id === editNode.id ? { ...editNode, data: { label: nodeLabel } } : node
      );
      setNodes(updatedNodes);
      setEditNode(null);
      setNodeLabel('');
    }
  };

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={connect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={(e, val) => {
          if(val){
            setNodeLabel(val?.data?.label);
            setEditNode(val);
          } 
          }}
          nodeTypes={nodeTypes}
        >
          <Background variant="lines" gap={5} color='#ebeff1'/>
          <Panel position="bottom-right">
            <div className="controllers_btns">
              <button onClick={() => zoomIn({ duration: 800 })}>Zoom In</button>
              <button onClick={() => zoomOut({ duration: 800 })} style={{ margin: '0 10px' }}>
                Zoom Out
              </button>
              <button onClick={() => fitView({ duration: 800 })}>Fit View</button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
      <Sidebar onSubmit={onSubmit} nodeLabel={nodeLabel} setNodeLabel={setNodeLabel} editNode={editNode} />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);