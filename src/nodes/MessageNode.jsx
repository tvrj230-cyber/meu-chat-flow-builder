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

  const onTimeoutChange = (evt) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) n.data = { ...n.data, timeoutHours: evt.target.value };
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

        <div style={{ marginTop: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
          <label style={{ color: '#ef4444' }}>Aguardar sem resposta (Horas)</label>
          <input 
            type="number" 
            value={data.timeoutHours || 1} 
            onChange={onTimeoutChange}
            className="nodrag"
            style={{ width: '100%', padding: '4px', marginTop: '4px', borderColor: '#ef4444' }}
            min="1"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="custom-handle" />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="custom-handle" />
      
      {/* O Handle Vermelho de Remarketing na base */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="timeout" 
        isConnectable={isConnectable} 
        style={{ background: '#ef4444', width: '12px', height: '12px', border: '2px solid white' }}
      />
    </div>
  );
}
