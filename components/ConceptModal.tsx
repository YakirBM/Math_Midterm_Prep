import React, { useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';
import { ExpandedExplanation } from '../types';
import MathText from './MathText';
import { getVisualization } from './Visualizations';

interface ConceptModalProps {
  explanation: ExpandedExplanation;
  isOpen: boolean;
  onClose: () => void;
}

const ConceptModal: React.FC<ConceptModalProps> = ({ explanation, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 p-5 flex justify-between items-center text-white z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold tracking-wide">{explanation.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          
          {/* Visualization Section */}
          <div className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-xl flex justify-center shadow-inner">
            {getVisualization(explanation.visualizationType)}
          </div>

          {/* Text Content */}
          <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-headings:text-slate-800">
            <MathText text={explanation.content} block />
          </div>

          {/* Footer Tip */}
          <div className="mt-8 p-4 bg-yellow-50 border-r-4 border-yellow-400 text-yellow-800 text-sm rounded-md">
            <strong>טיפ ללמידה:</strong> נסו לדמיין את הגרף בראש לפני שאתם ניגשים לפתרון האלגברי. הויזואליזציה עוזרת לפסול תשובות לא הגיוניות במהירות.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptModal;