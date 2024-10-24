// NodesContext.js
import React, { createContext, useContext } from 'react';
const NodesContext = createContext();
export const NodesProvider = ({ children, nodes, setNodes }) => {
  return (
    <NodesContext.Provider value={{ nodes, setNodes }}>
      {children}
    </NodesContext.Provider>
  );
};

export const useNodesContext = () => {
  return useContext(NodesContext);
};