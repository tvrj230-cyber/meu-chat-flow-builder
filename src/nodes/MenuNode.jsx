import React from 'react';
import { Handle, Position } from 'reactflow';
import { List } from 'lucide-react';
import './Nodes.css';

export default function MenuNode({ data, isConnectable }) {
  const options = data.options || ['Opção 1', 'Opção 2'];

  return (
    <div className="custom-node node-menu">
      <div className="node-header">
        <List size={18} />
        {data.label || 'Menu UAZAPI'}
      </div>
      <div className="node-body">
        <label>Texto do Menu</label>
        <input type="text" defaultValue={data.text || 'Escolha uma opção:'} className="nodrag" />
        
        <label>Opções (Conexões)</label>
        <div className="menu-options-list">
          {options.map((opt, index) => (
            <div key={index} className="menu-option-item" style={{ position: 'relative' }}>
               <span>{opt}</span>
               <Handle
                 type="source"
                 position={Position.Right}
                 id={`option-${index}`}
                 style={{ top: '50%', right: -22, transform: 'translateY(-50%)' }}
                 isConnectable={isConnectable}
                 className="custom-handle"
               />
            </div>
          ))}
        </div>
        <button className="nodrag" style={{ background: 'transparent', border: '1px dashed var(--panel-border)', color: 'var(--text-secondary)', padding: '6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', marginTop: '4px' }}>
           + Adicionar Opção
        </button>
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="custom-handle" />
    </div>
  );
}
