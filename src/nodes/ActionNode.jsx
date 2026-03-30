import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Zap, Trash2 } from 'lucide-react';
import './Nodes.css';

export default function ActionNode({ id, data, isConnectable }) {
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
    <div className="custom-node node-action">
      <div className="node-header">
        <Zap size={18} />
        <span style={{ flexGrow: 1 }}>{data.label || 'Ação'}</span>
        <button className="del-btn nodrag" onClick={onDelete}><Trash2 size={16} /></button>
      </div>
      <div className="node-body">
        <label>Sistema / Integração</label>
        <select className="nodrag" value={data.actionType || 'save_lead'} onChange={(e) => updateData('actionType', e.target.value)}>
           <option value="human_transfer">Transferir para Atendente Humano</option>
           <option value="save_lead">Salvar Dados no Supabase</option>
           <option value="update_status">Atualizar Status de Rotina</option>
           <option value="webhook">Disparar Webhook (N8N/Make)</option>
        </select>
        
        {data.actionType !== 'human_transfer' && (
          <>
            <label style={{ marginTop: '8px' }}>Destino / Parâmetros Opcionais</label>
            <input 
              type="text" 
              value={data.params || ''} 
              onChange={(e) => updateData('params', e.target.value)} 
              placeholder="Ex: Qual tabela ou URL do webhook" 
              className="nodrag" 
            />
          </>
        )}
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="custom-handle" />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="custom-handle" />
    </div>
  );
}
