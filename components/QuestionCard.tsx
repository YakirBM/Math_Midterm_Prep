import React, { useState } from 'react';
import { Question } from '../types';
import MathText from './MathText';
import { ChevronDown, CheckCircle, XCircle, Lightbulb, BookOpen } from 'lucide-react';
import ConceptModal from './ConceptModal';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showConcept, setShowConcept] = useState(false);

  // Reset state when question changes
  React.useEffect(() => {
    setSelectedOptionId(null);
    setShowSolution(false);
    setShowConcept(false);
  }, [question.id]);

  const handleOptionClick = (optionId: string) => {
    if (selectedOptionId) return; // Prevent changing answer
    setSelectedOptionId(optionId);
  };

  const isCorrect = (optionId: string) => {
    return question.options.find(o => o.id === optionId)?.isCorrect;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-lg">
        
        {/* Header */}
        <div className="bg-slate-50/80 p-4 border-b border-slate-100 flex justify-between items-center backdrop-blur-sm">
          <span className="font-bold text-slate-700">תרגיל {question.id}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${question.type === 'multiple-choice' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {question.type === 'multiple-choice' ? 'שאלה אמריקאית' : 'שאלה פתוחה'}
          </span>
        </div>

        <div className="p-6">
          {/* Question Title & Content */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">{question.title}</h3>
            <div className="text-center py-6 px-4 bg-slate-50 rounded-lg border border-slate-100 mb-6">
              <MathText text={question.content} className="text-xl text-slate-800" block />
            </div>

            {/* Options */}
            {question.type === 'multiple-choice' && (
              <div className={`grid gap-3 ${question.options.length > 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {question.options.map((option) => {
                  let cardClass = "relative p-4 border rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-200 ";
                  const isSelected = selectedOptionId === option.id;
                  
                  if (selectedOptionId) {
                    if (option.isCorrect) {
                      cardClass += "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500";
                    } else if (isSelected && !option.isCorrect) {
                      cardClass += "bg-rose-50 border-rose-500 ring-1 ring-rose-500";
                    } else {
                      cardClass += "opacity-60 grayscale-[0.5]";
                    }
                  } else {
                    cardClass += "hover:bg-slate-50 hover:border-blue-300";
                  }

                  return (
                    <div 
                      key={option.id} 
                      onClick={() => handleOptionClick(option.id)}
                      className={cardClass}
                    >
                      <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full text-sm font-bold transition-colors
                        ${selectedOptionId && option.isCorrect ? 'bg-emerald-200 text-emerald-800' : 
                          selectedOptionId && isSelected ? 'bg-rose-200 text-rose-800' : 
                          'bg-slate-100 text-slate-500'}`}
                      >
                        {option.id}
                      </div>
                      <div className="flex-grow">
                        <MathText text={option.text} />
                      </div>
                      {selectedOptionId && option.isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                      {selectedOptionId && isSelected && !option.isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                    </div>
                  );
                })}
              </div>
            )}
            
            {question.type === 'open' && (
              <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                  בשאלה פתוחה, נסה לפתור על דף לפני צפייה בפתרון.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex-1 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors group"
            >
              <Lightbulb className={`w-5 h-5 transition-colors ${showSolution ? 'fill-blue-700' : 'fill-none'}`} />
              <span>{showSolution ? 'הסתר פתרון' : 'הצג פתרון מלא'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showSolution ? 'rotate-180' : ''}`} />
            </button>

            {question.expandedExplanation && (
              <button
                onClick={() => setShowConcept(true)}
                className="py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors border border-indigo-100"
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline">הרחב על הנושא</span>
                <span className="sm:hidden">הרחב</span>
              </button>
            )}
          </div>

          {/* Detailed Solution */}
          {showSolution && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="bg-gradient-to-r from-blue-50 to-white border-r-4 border-blue-500 p-5 rounded-lg mb-6 shadow-sm">
                <h4 className="font-bold text-blue-900 mb-2">הרעיון המרכזי:</h4>
                <p className="text-blue-800 text-sm md:text-base leading-relaxed">{question.solution.concept}</p>
              </div>
              
              <div className="space-y-4">
                {question.solution.steps.map((step, idx) => (
                  <div key={idx} className="relative bg-white border border-slate-200 rounded-lg p-4 pr-12 shadow-sm">
                    <div className="absolute top-4 right-3 w-6 h-6 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="text-slate-700 leading-relaxed">
                      <MathText text={step} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg font-medium flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>תשובה סופית: <MathText text={question.solution.finalAnswer} /></span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Concept Modal Popup */}
      {question.expandedExplanation && (
        <ConceptModal 
          explanation={question.expandedExplanation} 
          isOpen={showConcept} 
          onClose={() => setShowConcept(false)} 
        />
      )}
    </>
  );
};

export default QuestionCard;