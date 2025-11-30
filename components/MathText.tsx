import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    MathJax?: any;
  }
}

interface MathTextProps {
  text: string;
  className?: string;
  block?: boolean;
}

const MathText: React.FC<MathTextProps> = ({ text, className = '', block = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Set content immediately so user sees raw text while MathJax loads
    element.innerHTML = text;

    // Function to safely attempt typesetting
    const attemptTypeset = () => {
      // Check if MathJax is fully loaded (has typesetPromise function)
      // window.MathJax exists as config object initially, so we must check the function specifically
      if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        window.MathJax.typesetPromise([element])
          .catch((err: any) => {
            // Silent catch to prevent console spam on unmounts or rapid changes
            // Fallback is already set via innerHTML above
          });
        return true;
      }
      return false;
    };

    // Try immediately
    if (!attemptTypeset()) {
      // If not ready, poll briefly (standard pattern for async script deps in React)
      const intervalId = setInterval(() => {
        if (attemptTypeset()) {
          clearInterval(intervalId);
        }
      }, 50);

      // Stop polling after 5 seconds
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 5000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [text]);

  const Component = block ? 'div' : 'span';
  
  return (
    <Component 
      ref={containerRef} 
      className={`math-content ${className}`}
      style={{ display: block ? 'block' : 'inline-block' }} 
    />
  );
};

export default MathText;