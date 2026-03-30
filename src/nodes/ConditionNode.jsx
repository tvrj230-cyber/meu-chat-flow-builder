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

  const updateData = (key, value) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) n.data = { ...n.data, [key]: value };
      return n;
    }));
  };

  const daysConfig = data.days || [1, 2, 3, 4, 5]; // Segunda a Sexta por padrão

  return (
    <div className="custom-node node-condition">
      <div className="node-header">
        <GitBranch size={18} />
        <span style={{ flexGrow: 1 }}>{data.label || 'Condicional'}</span>
        <button className="del-btn nodrag" onClick={onDelete}><Trash2 size={16} /></button>
      </div>
      <div className="node-body">
        <label>Validar por</label>
        <select className="nodrag" value={data.rule || 'horario'} onChange={(e) => updateData('rule', e.target.value)}>
           <option value="horario">Horário de Atendimento da Empresa</option>
           <option value="variavel">Resposta Exata do Usuário</option>
        </select>
        
        {(!data.rule || data.rule === 'horario') && (
           <div style={{ marginTop: '8px', background: 'var(--panel-bg)', padding: '10px', borderRadius: '6px', border: '1px solid var(--panel-border)' }}>
             <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                   <label style={{ fontSize: '0.65rem' }}>Abertura</label>
                   <input type="time" value={data.startTime || '08:00'} onChange={(e) => updateData('startTime', e.target.value)} className="nodrag" />
                </div>
                <div style={{ flex: 1 }}>
                   <label style={{ fontSize: '0.65rem' }}>Fechamento</label>
                   <input type="time" value={data.endTime || '18:00'} onChange={(e) => updateData('endTime', e.target.value)} className="nodrag" />
                </div>
             </div>
             <div>
                <label style={{ fontSize: '0.65rem', display: 'block', marginBottom: '4px' }}>Dias de Funcionamento</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, i) => {
                     const active = daysConfig.includes(i);
                     return (
                        <button 
                          key={day}
                          className="nodrag"
                          onClick={() => {
                              const newDays = active ? daysConfig.filter(d => d !== i) : [...daysConfig, i];
                              updateData('days', newDays);
                          }}
                          style={{
                            background: active ? 'var(--accent-color)' : 'transparent',
                            color: active ? '#fff' : 'var(--text-secondary)',
                            border: `1px solid ${active ? 'var(--accent-color)' : 'var(--panel-border)'}`,
                            borderRadius: '4px',
                            padding: '4px',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            flex: 1
                          }}
                        >{day}</button>
                     );
                  })}
                </div>
             </div>
           </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '14px' }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
             <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>{data.rule === 'variavel' ? 'Se Bater (Verdade)' : 'Dentro do Horário (Aberto)'}</span>
             <Handle type="source" position={Position.Right} id="true" style={{ top: '50%', right: '-12px', transform: 'translateY(-50%)' }} isConnectable={isConnectable} className="custom-handle" />
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
             <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 'bold' }}>{data.rule === 'variavel' ? 'Se Errado (Falso)' : 'Fora do Horário (Fechado)'}</span>
             <Handle type="source" position={Position.Right} id="false" style={{ top: '50%', right: '-12px', transform: 'translateY(-50%)' }} isConnectable={isConnectable} className="custom-handle" />
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="custom-handle" />
    </div>
  );
}
