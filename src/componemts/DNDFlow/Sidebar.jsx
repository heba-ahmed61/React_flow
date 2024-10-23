import React from 'react';
import { useDnD } from './DnDContext';
import FlowForm from './FlowForm';

export default ({ onSubmit, nodeLabel, setNodeLabel, editNode }) => {
  const [_, setType] = useDnD();
  const nodes = [
    { id: 1, title: 'User'},
    { id: 2, title: 'Cart' },
    { id: 3, title: 'Checkout' },
    { id: 4, title: 'Payment Gateway' },
    { id: 5, title: 'Payment Processor' },
    { id: 6, title: 'Fraud Detection' },
    { id: 7, title: 'IF/Else Condition' },
    { id: 8, title: 'IF' },
    { id: 9, title: 'Else' },
    { id: 10, title: 'Bank Processing' },
    { id: 11, title: 'Payment Confirmation' },
    { id: 12, title: 'Transaction Success' },
    { id: 13, title: 'Transaction Failed' },
  ];

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">Drag and drop nodes into the flow</div>
      {nodes.map(node => (
        <div key={node.id}
             className="dndnode input"
             onDragStart={(event) => onDragStart(event, node.title)}
             draggable>
         <div className='node_icon'>{node?.icon}</div>
         <div className='node_title'>{node.title}</div>
        </div>
      ))}
      <div className='flow_form'>
        <FlowForm onSubmit={onSubmit} nodeLabel={nodeLabel} setNodeLabel={setNodeLabel} editNode={editNode}/>
      </div>
    </aside>
  );
};
