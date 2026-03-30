import React from 'react';
import { MessageSquare, List, GitBranch, Zap, Save } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ exportFlow }) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>FlowBuilder</h2>
        <p>Arraste os blocos para o painel</p>
      </div>

      <div className="nodes-container">
        <div className="dndnode message-node" onDragStart={(event) => onDragStart(event, 'messageNode')} draggable>
          <MessageSquare size={18} />
          <span>Mensagem (Texto)</span>
        </div>

        <div className="dndnode menu-node" onDragStart={(event) => onDragStart(event, 'menuNode')} draggable>
          <List size={18} />
          <span>Menu (UAZAPI)</span>
        </div>

        <div className="dndnode condition-node" onDragStart={(event) => onDragStart(event, 'conditionNode')} draggable>
          <GitBranch size={18} />
          <span>Condição</span>
        </div>

        <div className="dndnode action-node" onDragStart={(event) => onDragStart(event, 'actionNode')} draggable>
          <Zap size={18} />
          <span>Ação (Supabase)</span>
        </div>
      </div>

      <div className="sidebar-footer">
         <button className="save-btn" onClick={exportFlow}>
            <Save size={18} /> Exportar JSON
         </button>
      </div>
    </aside>
  );
}
