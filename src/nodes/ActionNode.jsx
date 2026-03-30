import React from 'react';
import { Handle, Position } from 'reactflow';
import { Zap } from 'lucide-react';
import './Nodes.css';

export default function ActionNode({ data, isConnectable }) {
  return (
    <div className="custom-node node-action">
      <div className="node-header">
        <Zap size={18} />
        {data.label || 'Ação'}
      </div>
      <div className="node-body">
        <label>Ação a Executar</label>
        <select className="nodrag" defaultValue="save_lead">
           <option value="save_lead">Salvar Dados no Supabase</option>
           <option value="update_status">Atualizar Status de Atendimento</option>
           <option value="webhook">Disparar Webhook Customizado</option>
        </select>
        
        <label style={{ marginTop: '8px' }}>Destino / Parâmetros</label>
        <input type="text" placeholder="Ex: Tabela 'Leads'" className="nodrag" />
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="custom-handle" />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="custom-handle" />
    </div>
  );
}
