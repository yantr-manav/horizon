
import React, { useRef, useEffect } from 'react';
import { Eye, EyeOff, RotateCw } from 'lucide-react';

const Visualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = React.useState(true);
  const [rotation, setRotation] = React.useState(0);
  
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation variables
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let animationFrameId: number;
    
    // Simple 3D-looking data structure visualization (simplified fibonacci tree)
    const drawFibonacciTree = (time: number) => {
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
      
      // Draw tree nodes starting from the center
      drawNode(centerX, centerY, 60, 0, time, 0);
      
      animationFrameId = requestAnimationFrame((timestamp) => drawFibonacciTree(timestamp));
    };
    
    const drawNode = (x: number, y: number, radius: number, depth: number, time: number, nodeValue: number) => {
      if (depth > 4 || radius < 10) return;
      
      // Node glow effect
      const glowIntensity = (Math.sin(time / 1000 + depth) + 1) / 2;
      
      // Draw connection lines to child nodes if not leaf
      if (depth < 4) {
        const angleOffset = rotation * Math.PI / 180;
        const angle1 = Math.PI / 4 + angleOffset;
        const angle2 = -Math.PI / 4 + angleOffset;
        const distance = radius * 2.2;
        
        const x1 = x + Math.cos(angle1) * distance;
        const y1 = y + Math.sin(angle1) * distance;
        const x2 = x + Math.cos(angle2) * distance;
        const y2 = y + Math.sin(angle2) * distance;
        
        // Draw lines with gradient
        ctx.beginPath();
        const gradient1 = ctx.createLinearGradient(x, y, x1, y1);
        gradient1.addColorStop(0, `rgba(0, 255, 255, ${0.7 - depth * 0.15})`);
        gradient1.addColorStop(1, `rgba(159, 0, 255, ${0.7 - depth * 0.15})`);
        ctx.strokeStyle = gradient1;
        ctx.lineWidth = 2 - depth * 0.3;
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        
        ctx.beginPath();
        const gradient2 = ctx.createLinearGradient(x, y, x2, y2);
        gradient2.addColorStop(0, `rgba(0, 255, 255, ${0.7 - depth * 0.15})`);
        gradient2.addColorStop(1, `rgba(159, 0, 255, ${0.7 - depth * 0.15})`);
        ctx.strokeStyle = gradient2;
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Draw child nodes
        drawNode(x1, y1, radius * 0.7, depth + 1, time, nodeValue === 0 ? 1 : nodeValue);
        drawNode(x2, y2, radius * 0.7, depth + 1, time, nodeValue === 0 ? 1 : nodeValue + 1);
      }
      
      // Draw node
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      const baseColor = depth === 0 ? 'rgba(0, 255, 255,' : 'rgba(159, 0, 255,';
      gradient.addColorStop(0, `${baseColor}${0.7 + glowIntensity * 0.3})`);
      gradient.addColorStop(1, `${baseColor}0.1)`);
      ctx.fillStyle = gradient;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw node border
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.8 - depth * 0.15})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw node value
      ctx.fillStyle = 'white';
      ctx.font = `${Math.max(12, radius / 2)}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(nodeValue.toString(), x, y);
    };
    
    // Start animation
    drawFibonacciTree(0);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, rotation]);
  
  const handleRotate = () => {
    setRotation((prev) => (prev + 45) % 360);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="glass-panel p-2 mb-2 flex items-center justify-between">
        <h3 className="text-cyan-400 text-sm font-medium">3D Code Visualization</h3>
        <div className="flex space-x-2">
          <button 
            className="p-1 hover:bg-white/5 rounded text-gray-400 hover:text-cyan-400"
            onClick={handleRotate}
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <button 
            className="p-1 hover:bg-white/5 rounded"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? 
              <Eye className="h-4 w-4 text-cyan-400" /> : 
              <EyeOff className="h-4 w-4 text-gray-400" />
            }
          </button>
        </div>
      </div>
      
      <div className="glass-panel flex-1 neon-border overflow-hidden relative">
        {isVisible ? (
          <canvas 
            ref={canvasRef} 
            className="w-full h-full" 
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">Visualization hidden</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visualization;
