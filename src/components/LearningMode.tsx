
import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { GraduationCap, X, ArrowRight, HelpCircle, Lightbulb, BookOpen, Code, Check } from 'lucide-react';

const LearningMode = () => {
  const { isLearningMode, setIsLearningMode } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const learningSteps = [
    {
      title: 'Welcome to Learning Mode',
      content: 'This guided mode will help you learn to code step by step. We\'ll walk through creating a simple function together.',
      code: '// Follow along with the instructions',
      task: 'Click "Next" to begin the tutorial.',
      hint: 'Learning mode provides guided instructions for beginners.',
    },
    {
      title: 'Step 1: Declaring a Function',
      content: 'Let\'s start by creating a basic function to calculate the factorial of a number.',
      code: 'function factorial(n) {\n  // We\'ll implement this next\n}',
      task: 'Type the function declaration as shown above.',
      hint: 'A function is declared using the "function" keyword followed by the name and parameters in parentheses.',
    },
    {
      title: 'Step 2: Adding Base Case',
      content: 'Every recursive function needs a base case to prevent infinite recursion.',
      code: 'function factorial(n) {\n  if (n <= 1) {\n    return 1;\n  }\n  // We\'ll add more code here\n}',
      task: 'Add the base case condition to handle when n is 0 or 1.',
      hint: 'The factorial of 0 and 1 is 1, so we return 1 when n <= 1.',
    },
    {
      title: 'Step 3: Implementing Recursion',
      content: 'Now let\'s implement the recursive case which calls the function itself.',
      code: 'function factorial(n) {\n  if (n <= 1) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}',
      task: 'Add the recursive call that multiplies n by factorial(n-1).',
      hint: 'In a factorial, we multiply the current number by the factorial of the number before it.',
    },
    {
      title: 'Step 4: Testing the Function',
      content: 'Let\'s test our function with a few examples to make sure it works correctly.',
      code: 'function factorial(n) {\n  if (n <= 1) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(5));  // Should output: 120',
      task: 'Add a console.log statement to test the factorial function with input 5.',
      hint: 'The factorial of 5 is 5 * 4 * 3 * 2 * 1 = 120.',
    },
    {
      title: 'Congratulations!',
      content: 'You\'ve successfully implemented a factorial function using recursion! This is a common pattern in programming.',
      code: 'function factorial(n) {\n  if (n <= 1) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(5));  // Outputs: 120\nconsole.log(factorial(0));  // Outputs: 1\nconsole.log(factorial(10)); // Outputs: 3628800',
      task: 'Try more examples or modify the code to handle negative inputs.',
      hint: 'For a complete implementation, you might want to add error handling for negative numbers since factorial is only defined for non-negative integers.',
    },
  ];
  
  const currentLesson = learningSteps[currentStep];
  
  const nextStep = () => {
    if (currentStep < learningSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowHint(false);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowHint(false);
    }
  };
  
  const toggleHint = () => {
    setShowHint(!showHint);
  };
  
  const closeLearningMode = () => {
    setIsLearningMode(false);
  };
  
  if (!isLearningMode) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-3xl glass-panel neon-border m-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-cyan-900/30">
          <div className="flex items-center">
            <GraduationCap className="h-5 w-5 text-cyan-400 mr-2" />
            <h2 className="text-cyan-400 text-lg font-medium">Learning Mode</h2>
          </div>
          <button onClick={closeLearningMode} className="p-1 rounded hover:bg-white/10">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-white text-xl font-medium mb-4">{currentLesson.title}</h3>
          <p className="text-gray-300 mb-6">{currentLesson.content}</p>
          
          <div className="bg-black/40 rounded-lg p-4 mb-6 font-mono text-sm text-green-300 whitespace-pre overflow-x-auto">
            {currentLesson.code}
          </div>
          
          <div className="flex items-start mb-6">
            <BookOpen className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Your Task:</h4>
              <p className="text-gray-300">{currentLesson.task}</p>
            </div>
          </div>
          
          {showHint && (
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-1">Hint:</h4>
                  <p className="text-gray-300">{currentLesson.hint}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between p-4 border-t border-cyan-900/30 bg-black/20">
          <div>
            <button 
              onClick={toggleHint}
              className="flex items-center px-3 py-1.5 rounded border border-cyan-500/30 hover:bg-cyan-900/20"
            >
              {showHint ? (
                <>
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-green-400 text-sm">Got it!</span>
                </>
              ) : (
                <>
                  <HelpCircle className="h-4 w-4 text-cyan-400 mr-2" />
                  <span className="text-cyan-400 text-sm">Need a hint?</span>
                </>
              )}
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={prevStep} 
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded text-sm ${
                currentStep === 0 ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:bg-white/10'
              }`}
            >
              Back
            </button>
            
            <button 
              onClick={nextStep}
              disabled={currentStep === learningSteps.length - 1}
              className={`flex items-center px-4 py-2 rounded text-sm ${
                currentStep === learningSteps.length - 1 
                  ? 'bg-green-500/20 text-green-400 cursor-not-allowed' 
                  : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
              }`}
            >
              {currentStep === learningSteps.length - 1 ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMode;
