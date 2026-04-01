import React, { useState, useCallback, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fake.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'fake-key';
const supabase = createClient(supabaseUrl, supabaseKey);
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
import DelayNode from './nodes/DelayNode';
import TagNode from './nodes/TagNode';
import ImageNode from './nodes/ImageNode';

import './App.css';

const nodeTypes = {
  messageNode: MessageNode,
  menuNode: MenuNode,
  conditionNode: ConditionNode,
  actionNode: ActionNode,
  delayNode: DelayNode,
  tagNode: TagNode,
  imageNode: ImageNode,
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

  // NOVIDADE: Quando abre a tela, carrega do Supabase
  React.useEffect(() => {
    const fetchFlow = async () => {
      try {
        const { data, error } = await supabase
          .from('flows')
          .select('flow_data')
          .eq('id', 'default')
          .single();
          
        if (data && data.flow_data) {
          if (data.flow_data.nodes) setNodes(data.flow_data.nodes);
          if (data.flow_data.edges) setEdges(data.flow_data.edges);
          console.log("Mapa mental carregado com sucesso do Banco V2.0!");
        }
      } catch (err) {
        console.warn("Nenhum mapa salvo encontrado, iniciando do zero.");
      }
    };
    fetchFlow();
  }, [setNodes, setEdges]);

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
        data: { 
          label: type === 'menuNode' ? 'Menu Interativo' : 
                 type === 'conditionNode' ? 'Horários' : 
                 type === 'actionNode' ? 'Supabase Action' : 
                 type === 'delayNode' ? 'Aguardar / Timeout' :
                 type === 'imageNode' ? 'Mídia / Imagem' :
                 type === 'tagNode' ? 'Atribuir Tag' : 'Mensagem' 
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const exportFlow = async () => {
    if (!reactFlowInstance) return;
    const flow = reactFlowInstance.toObject();
    
    try {
      const { error } = await supabase
        .from('flows')
        .upsert({ id: 'default', flow_data: flow });
        
      if (error) throw error;
      alert('✅ Mapa Mental salvo e publicado no robô com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar no Supabase:', err);
      alert('❌ Erro ao salvar o mapa. O banco de dados ou as credenciais podem estar incorretos.');
    }
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
