
import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCw, ArrowLeft, ArrowRight, ZapOff } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface DebugNode {
  id: number;
  value: number;
  x: number;
  y: number;
  level: number;
  label: string;
  children: number[];
}

const DebugVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDebugMode } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [debugSpeed, setDebugSpeed] = useState(1);
  const [debugNodes, setDebugNodes] = useState<DebugNode[]>([]);
  
  // Generate sample debug data - in a real app, this would come from actual code execution
  useEffect(() => {
    if (!isDebugMode) return;
    
    // Sample debug data for Fibonacci calculation
    const nodes: DebugNode[] = [
      { id: 1, value: 5, x: 0.5, y: 0.2, level: 0, label: 'fib(5)', children: [2, 3] },
      { id: 2, value: 4, x: 0.3, y: 0.35, level: 1, label: 'fib(4)', children: [4, 5] },
      { id: 3, value: 3, x: 0.7, y: 0.35, level: 1, label: 'fib(3)', children: [6, 7] },
      { id: 4, value: 3, x: 0.2, y: 0.5, level: 2, label: 'fib(3)', children: [8, 9] },
      { id: 5, value: 2, x: 0.4, y: 0.5, level: 2, label: 'fib(2)', children: [10, 11] },
      { id: 6, value: 2, x: 0.6, y: 0.5, level: 2, label: 'fib(2)', children: [12, 13] },
      { id: 7, value: 1, x: 0.8, y: 0.5, level: 2, label: 'fib(1)', children: [] },
      { id: 8, value: 2, x: 0.15, y: 0.65, level: 3, label: 'fib(2)', children: [14, 15] },
      { id: 9, value: 1, x: 0.25, y: 0.65, level: 3, label: 'fib(1)', children: [] },
      { id: 10, value: 1, x: 0.35, y: 0.65, level: 3, label: 'fib(1)', children: [] },
      { id: 11, value: 0, x: 0.45, y: 0.65, level: 3, label: 'fib(0)', children: [] },
      { id: 12, value: 1, x: 0.55, y: 0.65, level: 3, label: 'fib(1)', children: [] },
      { id: 13, value: 0, x: 0.65, y: 0.65, level: 3, label: 'fib(0)', children: [] },
      { id: 14, value: 1, x: 0.12, y: 0.8, level: 4, label: 'fib(1)', children: [] },
      { id: 15, value: 0, x: 0.18, y: 0.8, level: 4, label: 'fib(0)', children: [] },
    ];
    
    setDebugNodes(nodes);
  }, [isDebugMode]);
  
  // Animation steps that reveal the execution path
  const steps = [
    { active: [1], highlighted: [] },
    { active: [1, 2], highlighted: [] },
    { active: [1, 2, 4], highlighted: [] },
    { active: [1, 2, 4, 8], highlighted: [] },
    { active: [1, 2, 4, 8, 14], highlighted: [] },
    { active: [1, 2, 4, 8, 14, 15], highlighted: [14, 15] },
    { active: [1, 2, 4, 8, 9], highlighted: [8] },
    { active: [1, 2, 4, 9], highlighted: [9] },
    { active: [1, 2, 5], highlighted: [4] },
    { active: [1, 2, 5, 10], highlighted: [10] },
    { active: [1, 2, 5, 11], highlighted: [11] },
    { active: [1, 2, 5], highlighted: [10, 11] },
    { active: [1, 2], highlighted: [5] },
    { active: [1, 3], highlighted: [2] },
    { active: [1, 3, 6], highlighted: [] },
    { active: [1, 3, 6, 12], highlighted: [12] },
    { active: [1, 3, 6, 13], highlighted: [13] },
    { active: [1, 3, 6], highlighted: [12, 13] },
    { active: [1, 3, 7], highlighted: [6] },
    { active: [1, 3], highlighted: [7] },
    { active: [1], highlighted: [3] },
    { active: [1], highlighted: [1, 2, 3] },
  ];
  
  // Animation loop
  useEffect(() => {
    if (!isDebugMode || !canvasRef.current || !isPlaying) return;
    
    let animationFrameId: number;
    let lastStepTime = 0;
    
    const animate = (time: number) => {
      // Update step based on time and speed
      if (time - lastStepTime > 1000 / debugSpeed) {
        setCurrentStep(prev => (prev + 1) % steps.length);
        lastStepTime = time;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, isDebugMode, debugSpeed]);
  
  // Draw debug visualization
  useEffect(() => {
    if (!isDebugMode || !canvasRef.current || debugNodes.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    resizeCanvas();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    
    // Horizontal lines
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    const currentStepData = steps[currentStep];
    const activeNodes = currentStepData.active;
    const highlightedNodes = currentStepData.highlighted;
    
    // Draw connections first (so they're behind nodes)
    debugNodes.forEach(node => {
      const nodeX = node.x * canvas.width;
      const nodeY = node.y * canvas.height;
      
      // Only draw connections for active nodes
      if (activeNodes.includes(node.id)) {
        node.children.forEach(childId => {
          const child = debugNodes.find(n => n.id === childId);
          if (child && activeNodes.includes(child.id)) {
            const childX = child.x * canvas.width;
            const childY = child.y * canvas.height;
            
            // Create gradient for connection
            const gradient = ctx.createLinearGradient(nodeX, nodeY, childX, childY);
            
            if (highlightedNodes.includes(node.id) || highlightedNodes.includes(child.id)) {
              gradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
              gradient.addColorStop(1, 'rgba(255, 255, 0, 0.8)');
              ctx.lineWidth = 3;
            } else {
              gradient.addColorStop(0, 'rgba(0, 255, 255, 0.6)');
              gradient.addColorStop(1, 'rgba(159, 0, 255, 0.6)');
              ctx.lineWidth = 2;
            }
            
            // Draw connection
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(nodeX, nodeY);
            ctx.lineTo(childX, childY);
            ctx.stroke();
          }
        });
      }
    });
    
    // Draw nodes
    debugNodes.forEach(node => {
      const nodeX = node.x * canvas.width;
      const nodeY = node.y * canvas.height;
      
      // Only draw active nodes
      if (activeNodes.includes(node.id)) {
        // Node radius based on level
        const radius = Math.max(35 - node.level * 5, 15);
        
        // Node color based on status
        let fillColor;
        let textColor = 'white';
        let borderColor;
        
        if (highlightedNodes.includes(node.id)) {
          fillColor = 'rgba(255, 255, 0, 0.3)';
          borderColor = 'rgba(255, 255, 0, 0.9)';
        } else {
          const alpha = 0.3;
          const borderAlpha = 0.7;
          
          if (node.children.length === 0) {
            // Leaf nodes (base cases)
            fillColor = `rgba(0, 255, 0, ${alpha})`;
            borderColor = `rgba(0, 255, 0, ${borderAlpha})`;
          } else {
            // Recursive nodes
            fillColor = `rgba(0, 255, 255, ${alpha})`;
            borderColor = `rgba(0, 255, 255, ${borderAlpha})`;
          }
        }
        
        // Draw node background
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw node border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw node label
        ctx.fillStyle = textColor;
        ctx.font = '14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, nodeX, nodeY);
        
        // Draw return value if it's a highlighted node
        if (highlightedNodes.includes(node.id)) {
          ctx.fillStyle = 'rgba(255, 255, 0, 0.9)';
          ctx.font = 'bold 12px monospace';
          ctx.fillText(`= ${node.value}`, nodeX, nodeY + radius + 15);
        }
      }
    });
    
    // Draw step counter
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Step: ${currentStep + 1}/${steps.length}`, 10, 20);
    
    // Add execution explanation
    const explanations = [
      "Starting fibonacci calculation: fib(5)",
      "Dividing into sub-problems: fib(4) and fib(3)",
      "Computing fib(4): Dividing into fib(3) and fib(2)",
      "Computing fib(3): Dividing into fib(2) and fib(1)",
      "Computing fib(2): Dividing into fib(1) and fib(0)",
      "Base cases reached: fib(1) = 1, fib(0) = 0",
      "Computing fib(2) = fib(1) + fib(0) = 1",
      "Returning fib(1) = 1",
      "Computing fib(3) = fib(2) + fib(1) = 2",
      "Returning fib(1) = 1",
      "Returning fib(0) = 0",
      "Computing fib(2) = fib(1) + fib(0) = 1",
      "Computing fib(3) = fib(2) + fib(1) = 2",
      "Computing fib(4) = fib(3) + fib(2) = 3",
      "Computing fib(3): Dividing into fib(2) and fib(1)",
      "Returning fib(1) = 1",
      "Returning fib(0) = 0",
      "Computing fib(2) = fib(1) + fib(0) = 1",
      "Returning fib(1) = 1",
      "Computing fib(3) = fib(2) + fib(1) = 2",
      "Computing fib(5) = fib(4) + fib(3) = 5",
      "Final result: fib(5) = 5",
    ];
    
    if (currentStep < explanations.length) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(explanations[currentStep], canvas.width / 2, canvas.height - 20);
    }
  }, [currentStep, debugNodes, isDebugMode, rotation]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const rotateView = () => {
    setRotation((prev) => (prev + 45) % 360);
  };
  
  const nextStep = () => {
    setCurrentStep(prev => (prev + 1) % steps.length);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => (prev - 1 + steps.length) % steps.length);
  };
  
  const changeSpeed = (speed: number) => {
    setDebugSpeed(speed);
  };
  
  if (!isDebugMode) return null;
  
  return (
    <div className="absolute inset-0 z-10 flex flex-col bg-black/50 backdrop-blur-md">
      <div className="p-3 flex items-center justify-between border-b border-cyan-900/30">
        <h2 className="text-cyan-400 font-medium">Debug Visualization: Fibonacci Recursion</h2>
        <div className="flex space-x-3">
          <div className="flex bg-black/30 rounded overflow-hidden">
            <button 
              className={`px-2 py-1 text-xs ${debugSpeed === 0.5 ? 'bg-cyan-900/30 text-cyan-400' : 'text-gray-400'}`}
              onClick={() => changeSpeed(0.5)}
            >
              0.5x
            </button>
            <button 
              className={`px-2 py-1 text-xs ${debugSpeed === 1 ? 'bg-cyan-900/30 text-cyan-400' : 'text-gray-400'}`}
              onClick={() => changeSpeed(1)}
            >
              1x
            </button>
            <button 
              className={`px-2 py-1 text-xs ${debugSpeed === 2 ? 'bg-cyan-900/30 text-cyan-400' : 'text-gray-400'}`}
              onClick={() => changeSpeed(2)}
            >
              2x
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/50 rounded-full px-4 py-2">
          <button 
            onClick={prevStep}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20"
            title="Previous step"
          >
            <ArrowLeft size={16} className="text-white" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? 
              <Pause size={20} className="text-cyan-400" /> : 
              <Play size={20} className="text-cyan-400" />
            }
          </button>
          
          <button 
            onClick={nextStep}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20"
            title="Next step"
          >
            <ArrowRight size={16} className="text-white" />
          </button>
        </div>
        
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button 
            onClick={rotateView}
            className="p-2 rounded-full bg-black/50 hover:bg-black/70"
            title="Rotate view"
          >
            <RotateCw size={16} className="text-cyan-400" />
          </button>
        </div>
        
        <div className="absolute top-4 left-4 bg-black/40 p-3 rounded text-xs text-gray-300">
          <h3 className="text-cyan-400 mb-2">Fibonacci Recursion</h3>
          <pre className="font-mono">
{`function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}

fib(5); // Calculating...`}
          </pre>
          <div className="mt-2 text-gray-400">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-cyan-400/50 mr-2"></div>
              <span>Recursive call</span>
            </div>
            <div className="flex items-center mt-1">
              <div className="w-3 h-3 rounded-full bg-green-400/50 mr-2"></div>
              <span>Base case</span>
            </div>
            <div className="flex items-center mt-1">
              <div className="w-3 h-3 rounded-full bg-yellow-400/50 mr-2"></div>
              <span>Active calculation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugVisualizer;
