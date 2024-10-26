import React, { useState } from 'react';
import { useDnD } from './DnDContext';
import FlowForm from './FlowForm';

export default ({ onSubmit, nodeLabel, setNodeLabel, editNode , setDeleteNode,allNodes,setNodes,setEditNode}) => {
  const [_, setType] = useDnD();
  const nodes = [
    { id: 1, title: "User" },
    { id: 2, title: "Cart" },
    { id: 3, title: "Checkout" },
    { id: 4, title: "Payment Gateway" },
    { id: 5, title: "Payment Processor" },
    { id: 6, title:"Card Networks"},
    { id: 7, title: "Fraud Detection" },
    { id: 8, title: "IF/Else Condition" },
    { id: 9, title: "IF" },
    { id: 10, title: "Else" },
    { id: 11, title: "Bank Processing" },
    { id: 12, title: "Payment Confirmation" },
    { id: 13, title: "Transaction Success" },
    { id: 14, title: "Transaction Failed" },
  ];
const [nodesListing, setNodesListing] = useState(nodes)
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  const handleSearch = (searchText) => {
   setNodesListing(nodes?.filter(item => item?.title?.toLowerCase().includes(searchText.toLowerCase())))
  }
  return (
    <aside>
      <h2 className="sidbar_description">Drag and drop nodes into the flow</h2>
       <div className='nodes_search'>
        <input placeholder='Search At Nodes' onChange={(e) => handleSearch(e.target.value)}/>
      </div>
       <div className='nodes_listing_wrapper'>
       {nodesListing?.map(node => (
        <div key={node.id}
             className="dndnode input"
             onDragStart={(event) => onDragStart(event, node.title)}
             draggable>
         <div className='node_title'>{node.title}</div>
        </div>
      ))}
       </div>
      <div className='flow_form'>
        <FlowForm onSubmit={onSubmit} nodeLabel={nodeLabel} setNodeLabel={setNodeLabel} editNode={editNode}  />
      </div>
      {editNode && <div className='node_delete_wrapper'>
        <button onClick={(e) => {
          setNodes(allNodes?.filter(node => node?.id != editNode?.id))
          setEditNode(null)
          setNodeLabel('')
        } }>Delete</button>
      </div>}
    </aside>
  );
};
