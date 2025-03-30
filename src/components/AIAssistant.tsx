
import React, { useState, useRef, useEffect } from 'react';
import { Bot, SquarePen, Send, Code, Lightbulb, ZapOff, CheckCircle, Copy, Trash, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

type MessageRole = 'user' | 'ai';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'ai',
      content: 'Hello! I\'m your AI coding assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<string[]>([
    'Optimize this function for better performance',
    'Explain this algorithm step by step',
    'Generate documentation for this code'
  ]);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI thinking
    setIsThinking(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setIsThinking(false);
      
      // Mock responses based on input
      let aiResponse = '';
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('optimize') || lowerInput.includes('improve')) {
        aiResponse = "I analyzed your code and found a potential optimization. The loop in function calculateData() has an O(n²) complexity. You can reduce it to O(n) by using a hashmap to store intermediate results:\n\n```javascript\nfunction calculateData(data) {\n  const cache = new Map();\n  \n  return data.map(item => {\n    if (cache.has(item.id)) {\n      return cache.get(item.id);\n    }\n    \n    const result = /* computation */;\n    cache.set(item.id, result);\n    return result;\n  });\n}\n```\n\nThis approach avoids recalculating results for items with the same ID.";
      } 
      else if (lowerInput.includes('explain') || lowerInput.includes('how')) {
        aiResponse = "This code implements a binary search algorithm. It works by repeatedly dividing the search interval in half:\n\n```javascript\nfunction binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid; // Target found\n    }\n    \n    if (arr[mid] < target) {\n      left = mid + 1; // Search in right half\n    } else {\n      right = mid - 1; // Search in left half\n    }\n  }\n  \n  return -1; // Target not found\n}\n```\n\nThe time complexity is O(log n), which is much faster than linear search for large arrays.";
      }
      else if (lowerInput.includes('error') || lowerInput.includes('bug')) {
        aiResponse = "I detected an issue in your code. On line 47, you're trying to access an array element that might be out of bounds:\n\n```javascript\n// Original code (potentially buggy)\nconst item = array[index];\n\n// Fixed version with boundary check\nif (index >= 0 && index < array.length) {\n  const item = array[index];\n  // Process item\n} else {\n  console.error('Index out of bounds:', index);\n}\n```\n\nAlways check array bounds before accessing elements to avoid runtime errors.";
      }
      else if (lowerInput.includes('generate') || lowerInput.includes('create')) {
        if (lowerInput.includes('component') || lowerInput.includes('button')) {
          aiResponse = "Here's a React component based on your request:\n\n```jsx\nimport React, { useState } from 'react';\n\ninterface ButtonProps {\n  text: string;\n  variant?: 'primary' | 'secondary' | 'danger';\n  size?: 'small' | 'medium' | 'large';\n  onClick?: () => void;\n  disabled?: boolean;\n}\n\nconst Button: React.FC<ButtonProps> = ({\n  text,\n  variant = 'primary',\n  size = 'medium',\n  onClick,\n  disabled = false\n}) => {\n  const [isHovered, setIsHovered] = useState(false);\n  \n  const baseClasses = 'rounded font-medium transition-all';\n  \n  const variantClasses = {\n    primary: 'bg-cyan-500 text-white hover:bg-cyan-600',\n    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',\n    danger: 'bg-red-500 text-white hover:bg-red-600'\n  };\n  \n  const sizeClasses = {\n    small: 'px-2 py-1 text-sm',\n    medium: 'px-4 py-2',\n    large: 'px-6 py-3 text-lg'\n  };\n  \n  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;\n  \n  return (\n    <button\n      className={classes}\n      onClick={onClick}\n      disabled={disabled}\n      onMouseEnter={() => setIsHovered(true)}\n      onMouseLeave={() => setIsHovered(false)}\n    >\n      {text}\n      {isHovered && <span className=\"ml-2\">→</span>}\n    </button>\n  );\n};\n\nexport default Button;\n```\n\nThis component is fully typed with TypeScript and includes hover effects, multiple variants, and size options.";
        } else if (lowerInput.includes('form')) {
          aiResponse = "Here's a React login form component with validation:\n\n```jsx\nimport React, { useState } from 'react';\n\nconst LoginForm = () => {\n  const [formData, setFormData] = useState({\n    email: '',\n    password: ''\n  });\n  \n  const [errors, setErrors] = useState({\n    email: '',\n    password: ''\n  });\n  \n  const [isSubmitting, setIsSubmitting] = useState(false);\n  \n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setFormData(prev => ({\n      ...prev,\n      [name]: value\n    }));\n    \n    // Clear error when user types\n    if (errors[name]) {\n      setErrors(prev => ({\n        ...prev,\n        [name]: ''\n      }));\n    }\n  };\n  \n  const validate = () => {\n    let isValid = true;\n    const newErrors = { email: '', password: '' };\n    \n    // Email validation\n    if (!formData.email) {\n      newErrors.email = 'Email is required';\n      isValid = false;\n    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {\n      newErrors.email = 'Email is invalid';\n      isValid = false;\n    }\n    \n    // Password validation\n    if (!formData.password) {\n      newErrors.password = 'Password is required';\n      isValid = false;\n    } else if (formData.password.length < 6) {\n      newErrors.password = 'Password must be at least 6 characters';\n      isValid = false;\n    }\n    \n    setErrors(newErrors);\n    return isValid;\n  };\n  \n  const handleSubmit = async (e) => {\n    e.preventDefault();\n    \n    if (validate()) {\n      setIsSubmitting(true);\n      \n      try {\n        // Simulate API call\n        await new Promise(resolve => setTimeout(resolve, 1000));\n        console.log('Login successful with', formData);\n        \n        // Here you would normally redirect after successful login\n      } catch (error) {\n        console.error('Login failed', error);\n      } finally {\n        setIsSubmitting(false);\n      }\n    }\n  };\n  \n  return (\n    <div className=\"max-w-md mx-auto p-6 bg-white rounded-lg shadow-md\">\n      <h2 className=\"text-2xl font-bold mb-6 text-center\">Log In</h2>\n      \n      <form onSubmit={handleSubmit}>\n        <div className=\"mb-4\">\n          <label className=\"block text-gray-700 mb-2\" htmlFor=\"email\">\n            Email Address\n          </label>\n          <input\n            type=\"email\"\n            id=\"email\"\n            name=\"email\"\n            value={formData.email}\n            onChange={handleChange}\n            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}\n            placeholder=\"your@email.com\"\n          />\n          {errors.email && <p className=\"text-red-500 text-sm mt-1\">{errors.email}</p>}\n        </div>\n        \n        <div className=\"mb-6\">\n          <label className=\"block text-gray-700 mb-2\" htmlFor=\"password\">\n            Password\n          </label>\n          <input\n            type=\"password\"\n            id=\"password\"\n            name=\"password\"\n            value={formData.password}\n            onChange={handleChange}\n            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}\n            placeholder=\"••••••••\"\n          />\n          {errors.password && <p className=\"text-red-500 text-sm mt-1\">{errors.password}</p>}\n        </div>\n        \n        <button\n          type=\"submit\"\n          disabled={isSubmitting}\n          className=\"w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed\"\n        >\n          {isSubmitting ? 'Logging in...' : 'Log In'}\n        </button>\n      </form>\n    </div>\n  );\n};\n\nexport default LoginForm;\n```\n\nThis form includes email and password validation, loading states, and error handling.";
        } else {
          aiResponse = "I've generated the code based on your request. Here's a simple implementation:\n\n```javascript\n// Basic structure\nconst data = [\n  { id: 1, name: 'Item 1', value: 42 },\n  { id: 2, name: 'Item 2', value: 23 },\n  { id: 3, name: 'Item 3', value: 67 }\n];\n\nfunction processData(items) {\n  return items.map(item => ({\n    ...item,\n    processed: true,\n    score: item.value * 1.5\n  }));\n}\n\nconst result = processData(data);\nconsole.log(result);\n```\n\nYou can customize this further based on your specific requirements.";
        }
      }
      else if (lowerInput.includes('document') || lowerInput.includes('comment')) {
        aiResponse = "I've added detailed documentation to your code:\n\n```javascript\n/**\n * Calculates the Fibonacci sequence up to the nth number.\n *\n * The Fibonacci sequence is a series of numbers where each number is the sum\n * of the two preceding ones, usually starting with 0 and 1.\n *\n * @param {number} n - The position in the Fibonacci sequence to calculate up to.\n * @returns {number[]} An array containing the Fibonacci sequence up to the nth number.\n * @throws {Error} If n is negative or not an integer.\n *\n * @example\n * // returns [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n * fibonacci(10);\n */\nfunction fibonacci(n) {\n  // Validate input parameter\n  if (n < 0 || !Number.isInteger(n)) {\n    throw new Error('Input must be a non-negative integer');\n  }\n  \n  // Handle base cases\n  if (n === 0) return [0];\n  if (n === 1) return [0, 1];\n  \n  // Initialize Fibonacci sequence with first two numbers\n  const sequence = [0, 1];\n  \n  // Calculate remaining numbers in sequence\n  for (let i = 2; i < n; i++) {\n    // Each number is the sum of the two preceding ones\n    sequence.push(sequence[i-1] + sequence[i-2]);\n  }\n  \n  return sequence;\n}\n```\n\nThis documentation follows JSDoc standards and includes a description, parameter details, return value, exceptions, and an example.";
      }
      else {
        aiResponse = "I'm analyzing your code to provide insights. I notice you're using a recursive approach for this problem. Consider using memoization to improve performance for repeated calculations:\n\n```javascript\nfunction memoizedFunction(fn) {\n  const cache = new Map();\n  \n  return function(...args) {\n    const key = JSON.stringify(args);\n    \n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    \n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    \n    return result;\n  };\n}\n\n// Example usage\nconst efficientFunction = memoizedFunction(function(n) {\n  // Your original recursive function here\n});\n```\n\nThis technique can significantly speed up functions that are called repeatedly with the same arguments.";
      }
      
      const aiMessageObj: Message = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessageObj]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard.",
    });
  };
  
  const savePrompt = () => {
    if (!input.trim()) return;
    
    setSavedPrompts(prev => {
      // Don't add duplicates
      if (prev.includes(input.trim())) {
        toast({
          title: "Prompt already saved",
          description: "This prompt is already in your saved list.",
        });
        return prev;
      }
      
      toast({
        title: "Prompt saved",
        description: "Your prompt has been saved for future use.",
      });
      
      return [input.trim(), ...prev];
    });
  };
  
  const usePrompt = (prompt: string) => {
    setInput(prompt);
  };
  
  const clearChat = () => {
    setMessages([
      {
        id: 'initial',
        role: 'ai',
        content: 'Hello! I\'m your AI coding assistant. How can I help you today?',
        timestamp: new Date()
      }
    ]);
    toast({
      title: "Chat cleared",
      description: "All previous messages have been cleared.",
    });
  };
  
  // Format code with syntax highlighting
  const formatMessage = (content: string) => {
    if (content.includes('```')) {
      return (
        <div>
          {content.split('```').map((part, i) => {
            if (i % 2 === 0) {
              return <p key={i} className="whitespace-pre-wrap mb-1">{part}</p>;
            } else {
              const codeContent = part.replace(/^(jsx|javascript|js|typescript|ts)\n/, '');
              return (
                <div key={i} className="relative group">
                  <pre className="bg-black/50 p-2 rounded font-mono text-xs text-green-300 overflow-x-auto mb-1">
                    {codeContent}
                  </pre>
                  <button 
                    onClick={() => copyToClipboard(codeContent)}
                    className="absolute top-2 right-2 p-1 rounded bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy code"
                  >
                    <Copy size={12} className="text-gray-300" />
                  </button>
                </div>
              );
            }
          })}
        </div>
      );
    }
    
    return <p className="whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div className="glass-panel p-2 md:p-3 neon-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Bot className="h-4 w-4 text-purple-400 mr-1" />
          <h3 className="text-xs md:text-sm font-medium text-purple-400">AI Assistant</h3>
        </div>
        <div className="flex space-x-1">
          <button 
            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-purple-400"
            title="Code mode"
          >
            <Code className="h-3 w-3 md:h-4 md:w-4" />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-purple-400"
            title="Explain mode"
          >
            <Lightbulb className="h-3 w-3 md:h-4 md:w-4" />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-cyan-400"
            title="Clear chat"
            onClick={clearChat}
          >
            <Trash className="h-3 w-3 md:h-4 md:w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-black/20 rounded p-2 mb-2">
        <div className="space-y-2">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-2 rounded text-xs md:text-sm ${
                  msg.role === 'user' 
                    ? 'bg-purple-500/20 text-white' 
                    : 'bg-cyan-500/20 text-white'
                }`}
              >
                {formatMessage(msg.content)}
                <div className="text-right mt-1 text-[10px] text-gray-400">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-cyan-500/20 max-w-[85%] p-2 rounded text-white">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {savedPrompts.length > 0 && (
        <div className="flex overflow-x-auto pb-2 mb-2 -mx-1 px-1 space-x-2">
          {savedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => usePrompt(prompt)}
              className="flex-shrink-0 px-2 py-1 rounded text-[10px] bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 whitespace-nowrap"
            >
              {prompt.length > 20 ? prompt.substring(0, 20) + '...' : prompt}
            </button>
          ))}
        </div>
      )}
      
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about your code..."
          className="cyber-input w-full text-xs pl-8 pr-16"
        />
        <SquarePen className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          {input.trim() && (
            <button 
              onClick={savePrompt}
              className="text-cyan-400 hover:text-cyan-300 p-1"
              title="Save prompt"
            >
              <Plus className="h-3 w-3 md:h-4 md:w-4" />
            </button>
          )}
          <button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isThinking}
            className={`${
              !input.trim() || isThinking ? 'text-gray-500' : 'text-purple-400 hover:text-purple-300'
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
