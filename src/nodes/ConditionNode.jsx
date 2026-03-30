import React from 'react';
import { Handle, Position } from 'reactflow';
import { GitBranch } from 'lucide-react';
import './Nodes.css';

export default function ConditionNode({ data, isConnectable }) {
  return (
    <div className="custom-node node-condition">
      <div className="node-header">
        <GitBranch size={18} />
        {data.label || 'Condição'}
      </div>
      <div className="node-body">
        <label>Validar por</label>
        <select className="nodrag" defaultValue="horario">
           <option value="horario">Horário de Atendimento</option>
           <option value="variavel">Resposta Exata do Usuário</option>
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
