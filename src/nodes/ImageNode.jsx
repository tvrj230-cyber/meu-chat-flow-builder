import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Image as ImageIcon, Trash2 } from 'lucide-react';
import './Nodes.css';

export default function ImageNode({ id, data, isConnectable }) {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(n => n.id !== id));
    setEdges((edges) => edges.filter(e => e.source !== id && e.target !== id));
  };

  const onUrlChange = (evt) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) {
        n.data = { ...n.data, imageUrl: evt.target.value };
      }
      return n;
    }));
  };

  const onCaptionChange = (evt) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) {
        n.data = { ...n.data, caption: evt.target.value };
      }
      return n;
    }));
  };

  return (
    <div className="custom-node node-message" style={{ borderColor: '#22c55e' }}>
      <div className="node-header" style={{ backgroundColor: '#22c55e', color: 'white' }}>
        <ImageIcon size={18} />
        <span style={{ flexGrow: 1 }}>{data.label || 'Mídia / Imagem'}</span>
        <button className="del-btn nodrag" onClick={onDelete} style={{ color: 'white' }}><Trash2 size={16} /></button>
      </div>
      <div className="node-body">
        <label>URL / Link da Imagem</label>
        <input 
          type="text"
          value={data.imageUrl || ''} 
          onChange={onUrlChange}
          placeholder="https://sua-imagem.com/foto.png"
          className="nodrag" 
          style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
        />
        <label>Legenda (Opcional)</label>
        <textarea 
          value={data.caption || ''} 
          onChange={onCaptionChange}
          placeholder="Digite um texto para acompanhar..."
          className="nodrag" 
          rows="2"
        />
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="custom-handle" />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="custom-handle" />
    </div>
  );
}
