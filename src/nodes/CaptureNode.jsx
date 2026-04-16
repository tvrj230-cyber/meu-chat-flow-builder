import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Database, Trash2 } from 'lucide-react';
import './Nodes.css';

export default function CaptureNode({ id, data, isConnectable }) {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(n => n.id !== id));
    setEdges((edges) => edges.filter(e => e.source !== id && e.target !== id));
  };

  const onChangeText = (evt) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) {
        n.data = { ...n.data, text: evt.target.value };
      }
      return n;
    }));
  };

  const onChangeError = (evt) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) {
        n.data = { ...n.data, errorMessage: evt.target.value };
      }
      return n;
    }));
  };

  return (
    <div className="custom-node" style={{ borderColor: '#8b5cf6', boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.2)' }}>
      <div className="node-header" style={{ background: '#8b5cf6', color: 'white' }}>
        <Database size={18} />
        <span style={{ flexGrow: 1 }}>{data.label || 'Capturar Dado'}</span>
        <button className="del-btn nodrag" style={{ color: 'white' }} onClick={onDelete}><Trash2 size={16} /></button>
      </div>
      <div className="node-body">
        <label style={{ color: '#6b7280', fontWeight: 'bold' }}>Sua Pergunta:</label>
        <textarea 
          value={data.text || ''} 
          onChange={onChangeText}
          placeholder="Ex: Qual o seu melhor e-mail?"
          className="nodrag" 
          style={{ marginBottom: '8px' }}
        />

        <label style={{ color: '#ef4444', fontWeight: 'bold' }}>Mensagem de Erro (Inválido):</label>
        <textarea 
          value={data.errorMessage || ''} 
          onChange={onChangeError}
          placeholder="Ex: Formato inválido. Tente novamente:"
          className="nodrag" 
          style={{ borderColor: '#fca5a5' }}
        />
      </div>
      
      <Handle 
        type="target" 
        position={Position.Left} 
        isConnectable={isConnectable} 
        className="custom-handle" 
        style={{ borderColor: '#8b5cf6' }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        isConnectable={isConnectable} 
        className="custom-handle" 
        style={{ borderColor: '#8b5cf6' }}
      />
    </div>
  );
}
