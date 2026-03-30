import React from 'react';
import { Handle, Position } from 'reactflow';
import { MessageSquare } from 'lucide-react';
import './Nodes.css';

export default function MessageNode({ data, isConnectable }) {
  return (
    <div className="custom-node node-message">
      <div className="node-header">
        <MessageSquare size={18} />
        {data.label || 'Mensagem'}
      </div>
      <div className="node-body">
        <label>Texto da Mensagem</label>
        <textarea 
          defaultValue={data.text || 'Digite sua mensagem...'} 
          className="nodrag" 
        />
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="custom-handle" />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="custom-handle" />
    </div>
  );
}
