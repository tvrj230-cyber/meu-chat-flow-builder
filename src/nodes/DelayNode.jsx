import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Clock, Trash2 } from 'lucide-react';
import './Nodes.css';

export default function DelayNode({ id, data, isConnectable }) {
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
    <div className="custom-node node-delay">
      <div className="node-header">
        <Clock size={18} />
        <span style={{ flexGrow: 1 }}>{data.label || 'Lembrete (Timeout)'}</span>
        <button className="del-btn nodrag" onClick={onDelete}><Trash2 size={16} /></button>
      </div>
      <div className="node-body">
        <label>Aguardar Resposta Por:</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="number" 
            value={data.time || '15'} 
            onChange={(e) => updateData('time', e.target.value)} 
            className="nodrag" 
            style={{ width: '60px' }}
          />
          <select className="nodrag" value={data.unit || 'm'} onChange={(e) => updateData('unit', e.target.value)}>
             <option value="s">Segundos</option>
             <option value="m">Minutos</option>
             <option value="h">Horas</option>
             <option value="d">Dias</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '14px' }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
             <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>Se Receber Resposta</span>
             <Handle
               type="source"
               position={Position.Right}
               id="answered"
               style={{ top: '50%', right: '-12px', transform: 'translateY(-50%)' }}
               isConnectable={isConnectable}
               className="custom-handle"
             />
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
             <span style={{ fontSize: '0.8rem', color: '#f97316', fontWeight: 'bold' }}>Caso Tempo Expire</span>
             <Handle
               type="source"
               position={Position.Right}
               id="timeout"
               style={{ top: '50%', right: '-12px', transform: 'translateY(-50%)' }}
               isConnectable={isConnectable}
               className="custom-handle"
             />
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="custom-handle" />
    </div>
  );
}
