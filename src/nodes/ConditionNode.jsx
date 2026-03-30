import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { GitBranch, Trash2 } from 'lucide-react';
import './Nodes.css';

export default function ConditionNode({ id, data, isConnectable }) {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(n => n.id !== id));
    setEdges((edges) => edges.filter(e => e.source !== id && e.target !== id));
  };

  const onChange = (evt) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) n.data = { ...n.data, rule: evt.target.value };
      return n;
    }));
  };

  return (
    <div className="custom-node node-condition">
      <div className="node-header">
        <GitBranch size={18} />
        <span style={{ flexGrow: 1 }}>{data.label || 'Condição'}</span>
        <button className="del-btn nodrag" onClick={onDelete}><Trash2 size={16} /></button>
      </div>
      <div className="node-body">
        <label>Validar por</label>
        <select className="nodrag" value={data.rule || 'horario'} onChange={onChange}>
           <option value="horario">Horário de Atendimento</option>
           <option value="variavel">Resposta do Usuário</option>
        </select>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
             <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 'bold' }}>Verdadeiro</span>
             <Handle
               type="source"
               position={Position.Right}
               id="true"
               style={{ top: '50%', right: '-12px', transform: 'translateY(-50%)' }}
               isConnectable={isConnectable}
               className="custom-handle"
             />
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
             <span style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 'bold' }}>Falso</span>
             <Handle
               type="source"
               position={Position.Right}
               id="false"
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
