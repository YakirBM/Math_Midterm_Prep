import React from 'react';
import { Topic } from '../types';
import { BookOpen, FunctionSquare, Calculator, X, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  topics: Topic[];
  activeTopicId: string;
  onSelectTopic: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ topics, activeTopicId, onSelectTopic, isOpen, onClose }) => {
  
  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <FunctionSquare className="w-5 h-5" />;
      case 1: return <BookOpen className="w-5 h-5" />;
      case 2: return <Calculator className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)
        border-l border-slate-100 flex flex-col
        md:translate-x-0 md:static md:shadow-none md:h-screen md:sticky md:top-0
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">נושאי לימוד</h2>
            <p className="text-xs text-slate-500 mt-1">בחר נושא לתרגול</p>
          </div>
          <button 
            onClick={onClose} 
            className="md:hidden p-2 text-slate-400 hover:bg-white hover:text-slate-600 rounded-full transition-colors shadow-sm border border-transparent hover:border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {topics.map((topic, index) => {
            const isActive = activeTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  onSelectTopic(topic.id);
                  // Only close on mobile
                  if (window.innerWidth < 768) onClose();
                }}
                className={`group w-full text-right p-4 rounded-xl flex items-start gap-4 transition-all duration-200 border
                  ${isActive 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-blue-200 hover:shadow-md'
                  }`}
              >
                <div className={`mt-1 p-2 rounded-lg transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50'}`}>
                  {getIcon(index)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-800'}`}>
                      {topic.title}
                    </span>
                    {isActive && <ChevronLeft className="w-4 h-4 opacity-75" />}
                  </div>
                  <div className={`text-xs leading-relaxed ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {topic.description}
                  </div>
                  <div className={`mt-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md inline-block
                    ${isActive ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}
                  `}>
                    {topic.questions.length} שאלות
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-xs text-slate-400">
          מתמטיקה לרפואנים
        </div>
      </aside>
    </>
  );
};

export default Sidebar;