import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { List, Trash2, X } from 'lucide-react';
import './Nodes.css';

export default function MenuNode({ id, data, isConnectable }) {
  const { setNodes, setEdges } = useReactFlow();
  const options = data.options || ['Opção 1'];

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(n => n.id !== id));
    setEdges((edges) => edges.filter(e => e.source !== id && e.target !== id));
  };

  const onTextChange = (evt) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) n.data = { ...n.data, text: evt.target.value };
      return n;
    }));
  };

  const onTimeoutChange = (evt) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) n.data = { ...n.data, timeoutHours: evt.target.value };
      return n;
    }));
  };

  const addOption = () => {
    const newOptions = [...options, `Opção ${options.length + 1}`];
    setNodes(nds => nds.map(n => {
      if (n.id === id) n.data = { ...n.data, options: newOptions };
      return n;
    }));
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setNodes(nds => nds.map(n => {
      if (n.id === id) n.data = { ...n.data, options: newOptions };
      return n;
    }));
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setNodes(nds => nds.map(n => {
      if (n.id === id) n.data = { ...n.data, options: newOptions };
      return n;
    }));
  };

  return (
    <div className="custom-node node-menu">
      <div className="node-header">
        <List size={18} />
        <span style={{ flexGrow: 1 }}>{data.label || 'Menu UAZAPI'}</span>
        <button className="del-btn nodrag" onClick={onDelete}><Trash2 size={16} /></button>
      </div>
      <div className="node-body">
        <label>Texto do Menu</label>
        <textarea 
          value={data.text || ''} 
          onChange={onTextChange} 
          placeholder="Ex: Escolha um setor:" 
          className="nodrag" 
          style={{ minHeight: '40px' }}
        />
        
        <label style={{ marginTop: '8px' }}>Opções (Conexões)</label>
        <div className="menu-options-list">
          {options.map((opt, index) => (
            <div key={index} className="menu-option-item" style={{ position: 'relative', display: 'flex', gap: '8px', paddingRight: '20px' }}>
               <input 
                 className="nodrag" 
                 value={opt} 
                 onChange={(e) => updateOption(index, e.target.value)} 
                 style={{ padding: '4px 8px', fontSize: '0.8rem', flexGrow: 1 }}
               />
               <button className="nodrag remove-opt-btn" onClick={() => removeOption(index)}><X size={14} /></button>
               
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
        <button className="nodrag add-btn" onClick={addOption}>
           + Adicionar Opção
        </button>

        <div style={{ marginTop: '15px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
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
      {/* O Handle Vermelho de Remarketing ficará na base do nó */}
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
