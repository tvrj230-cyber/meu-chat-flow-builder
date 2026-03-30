import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './components/Sidebar';
import MessageNode from './nodes/MessageNode';
import MenuNode from './nodes/MenuNode';
import ConditionNode from './nodes/ConditionNode';
import ActionNode from './nodes/ActionNode';

import './App.css';

const nodeTypes = {
  messageNode: MessageNode,
  menuNode: MenuNode,
  conditionNode: ConditionNode,
  actionNode: ActionNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'messageNode',
    data: { label: 'Boas Vindas', text: 'Olá! Bem-vindo.' },
    position: { x: 300, y: 150 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

function Flow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
        y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
      });
      
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: type === 'menuNode' ? 'Menu Interativo' : type === 'conditionNode' ? 'Condição' : type === 'actionNode' ? 'Supabase Action' : 'Mensagem' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const exportFlow = () => {
    if (!reactFlowInstance) return;
    const flow = reactFlowInstance.toObject();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flow, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "flow-v1.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="dndflow">
      <Sidebar exportFlow={exportFlow} />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <Background color="#f97316" gap={20} size={1} opacity={0.3} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="app-container">
        <Flow />
      </div>
    </ReactFlowProvider>
  );
}
