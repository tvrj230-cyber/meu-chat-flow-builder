import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Tag, Trash2 } from 'lucide-react';
import './Nodes.css';

export default function TagNode({ id, data, isConnectable }) {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(n => n.id !== id));
    setEdges((edges) => edges.filter(e => e.source !== id && e.target !== id));
  };

  const updateData = (key, value) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) n.data = { ...n.data, [key]: value };
      return n;
    }));
  };

  return (
    <div className="custom-node node-tag">
      <div className="node-header">
        <Tag size={18} />
        <span style={{ flexGrow: 1 }}>{data.label || 'Atribuir Tag'}</span>
        <button className="del-btn nodrag" onClick={onDelete}><Trash2 size={16} /></button>
      </div>
      <div className="node-body">
        <label>Nome da Tag (Qualificação)</label>
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--node-bg)', padding: '6px', borderRadius: '6px', border: '1px solid var(--panel-border)' }}>
            <span style={{ color: 'var(--text-secondary)', padding: '0 8px', fontSize: '0.9rem' }}>#</span>
            <input 
              type="text" 
              value={data.tagName || ''} 
              onChange={(e) => updateData('tagName', e.target.value)} 
              placeholder="Ex: interessado_plano_b" 
              className="nodrag" 
              style={{ border: 'none', background: 'transparent', padding: '4px', width: '100%' }}
            />
        </div>
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="custom-handle" />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="custom-handle" />
    </div>
  );
}
