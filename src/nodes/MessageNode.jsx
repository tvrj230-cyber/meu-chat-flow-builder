import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { MessageSquare, Trash2 } from 'lucide-react';
import './Nodes.css';

export default function MessageNode({ id, data, isConnectable }) {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(n => n.id !== id));
    setEdges((edges) => edges.filter(e => e.source !== id && e.target !== id));
  };

  const onChange = (evt) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) {
        n.data = { ...n.data, text: evt.target.value };
      }
      return n;
    }));
  };

  return (
    <div className="custom-node node-message">
      <div className="node-header">
        <MessageSquare size={18} />
        <span style={{ flexGrow: 1 }}>{data.label || 'Mensagem'}</span>
        <button className="del-btn nodrag" onClick={onDelete}><Trash2 size={16} /></button>
      </div>
      <div className="node-body">
        <label>Texto da Mensagem</label>
        <textarea 
          value={data.text || ''} 
          onChange={onChange}
          placeholder="Digite sua mensagem..."
          className="nodrag" 
        />
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="custom-handle" />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="custom-handle" />
    </div>
  );
}
