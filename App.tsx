
import React, { useState } from 'react';
import { topics } from './data';
import QuestionCard from './components/QuestionCard';
import Sidebar from './components/Sidebar';
import { Menu, GraduationCap, Info } from 'lucide-react';

const App: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const activeTopic = topics.find(t => t.id === activeTopicId) || topics[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans" dir="rtl">
      
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="פתח תפריט"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          <span>מתמטיקה לרפואנים</span>
        </h1>
        <div className="w-10"></div> {/* Spacer for visual centering */}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 md:order-2 h-full">
        {/* Desktop Header Banner */}
        <div className="hidden md:block bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12 px-8 shadow-lg relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm shadow-inner">
                  <GraduationCap className="w-10 h-10 text-blue-300" />
                </div>
                מאגר תרגילים מקיף
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl font-light leading-relaxed opacity-90">
                הכנה ממוקדת לבוחן אמצע בפקולטה לרפואה בצפת. כולל פתרונות מלאים, הסברים גרפיים וטיפים לפתרון.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          {/* Active Topic Header */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-1.5 bg-blue-600 rounded-full shadow-sm"></div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800">{activeTopic.title}</h2>
            </div>
            <p className="text-slate-600 mr-4 text-lg">{activeTopic.description}</p>
          </div>

          {/* Questions List */}
          <div className="space-y-8">
            {activeTopic.questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>

          {/* Footer inside content for cleaner scroll */}
          <footer className="mt-16 py-8 border-t border-slate-200 text-center text-slate-500 text-sm">
            <div className="flex items-center justify-center gap-2 mb-2 p-2 bg-blue-50 text-blue-700 rounded-full inline-flex px-4">
              <Info className="w-4 h-4" />
              <span className="font-medium">נבנה כעזר לימודי עבור סטודנטים לרפואה</span>
            </div>
            <p className="mt-2">בהצלחה בבוחן!</p>
          </footer>
        </div>
      </main>

      {/* Sidebar Navigation */}
      <div className="md:order-1">
        <Sidebar 
          topics={topics} 
          activeTopicId={activeTopicId} 
          onSelectTopic={(id) => {
            setActiveTopicId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;
