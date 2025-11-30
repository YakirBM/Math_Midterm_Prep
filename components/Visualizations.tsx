import React from 'react';

// Shared Definitions for Markers
const SvgDefs = () => (
  <defs>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6"
        orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
    </marker>
    <marker id="arrow-slate" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6"
        orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
    </marker>
  </defs>
);

// Unit Circle Visualization
export const UnitCircleVis = () => (
  <div className="flex flex-col items-center">
    <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-64 md:h-64">
      <SvgDefs />
      {/* Grid */}
      <line x1="10" y1="100" x2="190" y2="100" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="100" y1="10" x2="100" y2="190" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Circle */}
      <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="2" />
      
      {/* Positive Sine Regions (Upper Half) */}
      <path d="M 180 100 A 80 80 0 0 0 20 100" fill="rgba(59, 130, 246, 0.2)" stroke="none" />
      
      {/* Angle Indicator */}
      <line x1="100" y1="100" x2="156" y2="44" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red)" />
      <path d="M 120 100 A 20 20 0 0 0 114 86" fill="none" stroke="#ef4444" strokeWidth="2" />
      
      {/* Text Labels */}
      <text x="195" y="105" fontSize="12" fill="#64748b">x</text>
      <text x="105" y="10" fontSize="12" fill="#64748b">y</text>
      <text x="160" y="40" fontSize="12" fill="#ef4444" fontWeight="bold">α</text>
      <text x="50" y="60" fontSize="10" fill="#1d4ed8">sin > 0</text>
      <text x="110" y="60" fontSize="10" fill="#1d4ed8">sin > 0</text>
    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">האיזור הכחול מסמן היכן הסינוס חיובי (רביע 1 ו-2)</p>
  </div>
);

// Even Function Visualization (Parity)
export const ParityEvenVis = () => (
  <div className="flex flex-col items-center">
    <svg viewBox="0 0 200 150" className="w-48 h-36">
      <SvgDefs />
      <line x1="10" y1="130" x2="190" y2="130" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="100" y1="10" x2="100" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Parabola x^2 */}
      <path d="M 40 10 Q 100 130 160 10" fill="none" stroke="#8b5cf6" strokeWidth="3" />
      
      {/* Symmetry Arrows */}
      <path d="M 70 70 L 130 70" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" markerEnd="url(#arrow-red)" markerStart="url(#arrow-red)" />
      
      <text x="165" y="145" fontSize="10" fill="#64748b">x</text>
      <text x="35" y="145" fontSize="10" fill="#64748b">-x</text>
      <text x="85" y="65" fontSize="10" fill="#ef4444">סימטריה</text>
    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">פונקציה זוגית: סימטרית לציר Y. $f(-x) = f(x)$</p>
  </div>
);

// Odd Function Visualization
export const ParityOddVis = () => (
  <div className="flex flex-col items-center">
    <svg viewBox="0 0 200 150" className="w-48 h-36">
      <SvgDefs />
      <line x1="10" y1="75" x2="190" y2="75" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="100" y1="10" x2="100" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Cubic x^3 like curve */}
      <path d="M 40 130 C 80 130 90 75 100 75 C 110 75 120 20 160 20" fill="none" stroke="#8b5cf6" strokeWidth="3" />
      
      {/* Point reflection */}
      <circle cx="140" cy="35" r="3" fill="#ef4444" />
      <circle cx="60" cy="115" r="3" fill="#ef4444" />
      <line x1="60" y1="115" x2="140" y2="35" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />

      <text x="145" y="35" fontSize="10" fill="#ef4444">(x, y)</text>
      <text x="15" y="120" fontSize="10" fill="#ef4444">(-x, -y)</text>
    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">פונקציה אי-זוגית: סימטריה לראשית הצירים. $f(-x) = -f(x)$</p>
  </div>
);

// Inverse Function Visualization
export const InverseFuncVis = () => (
  <div className="flex flex-col items-center">
    <svg viewBox="0 0 200 200" className="w-48 h-48">
      <line x1="10" y1="190" x2="190" y2="190" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="10" y1="10" x2="10" y2="190" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* y=x line */}
      <line x1="10" y1="190" x2="190" y2="10" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
      <text x="170" y="30" fontSize="10" fill="#94a3b8">y=x</text>
      
      {/* e^x */}
      <path d="M 10 180 Q 50 180 100 10" fill="none" stroke="#3b82f6" strokeWidth="3" />
      <text x="60" y="50" fontSize="12" fill="#3b82f6" fontWeight="bold">f(x)</text>

      {/* ln(x) */}
      <path d="M 20 190 Q 20 150 190 100" fill="none" stroke="#10b981" strokeWidth="3" />
      <text x="150" y="140" fontSize="12" fill="#10b981" fontWeight="bold">f⁻¹(x)</text>
    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">פונקציות הופכיות הן תמונת מראה ביחס לישר $y=x$</p>
  </div>
);

// Log & Exp Visualization
export const LogExpVis = () => (
  <div className="flex flex-col items-center">
    <svg viewBox="0 0 200 150" className="w-48 h-36 bg-white border border-slate-50 rounded">
      <line x1="10" y1="140" x2="190" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="20" y1="10" x2="20" y2="150" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* ln(x) */}
      <path d="M 25 150 C 30 50 180 50 190 40" fill="none" stroke="#f59e0b" strokeWidth="3" />
      
      {/* Domain restriction */}
      <rect x="0" y="0" width="20" height="150" fill="rgba(200, 0, 0, 0.1)" />
      
      <text x="100" y="100" fontSize="12" fill="#f59e0b">y = ln(x)</text>
      <text x="30" y="20" fontSize="10" fill="#ef4444">x ≤ 0 לא מוגדר</text>
    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">פונקציית הלאן מוגדרת רק עבור $x>0$ ושואפת למינוס אינסוף באפס</p>
  </div>
);

// Domain Range General Visualization
export const DomainRangeVis = () => (
  <div className="flex flex-col items-center">
    <svg viewBox="0 0 200 100" className="w-48 h-24">
      <SvgDefs />
      {/* Machine Concept */}
      <rect x="70" y="20" width="60" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
      <text x="85" y="55" fontSize="14" fill="#1e40af" fontWeight="bold">f(x)</text>
      
      {/* Input */}
      <path d="M 10 50 L 60 50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-slate)" />
      <text x="20" y="40" fontSize="12" fill="#64748b">תחום</text>
      
      {/* Output */}
      <path d="M 130 50 L 180 50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-slate)" />
      <text x="140" y="40" fontSize="12" fill="#64748b">טווח</text>
    </svg>
    <p className="text-xs text-slate-500 mt-2 text-center">התחום הוא מה שנכנס, הטווח הוא מה שיוצא</p>
  </div>
);


export const getVisualization = (type: string) => {
  switch (type) {
    case 'unit-circle': return <UnitCircleVis />;
    case 'parity-even': return <ParityEvenVis />;
    case 'parity-odd': return <ParityOddVis />;
    case 'inverse-function': return <InverseFuncVis />;
    case 'log-exp': return <LogExpVis />;
    case 'domain-range': return <DomainRangeVis />;
    default: return null;
  }
};