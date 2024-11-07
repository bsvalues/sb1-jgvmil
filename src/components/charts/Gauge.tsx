import { useEffect, useRef } from 'react';

interface GaugeProps {
  value: number;
  size?: number;
  color?: string;
}

export function Gauge({ value, size = 200, color = 'currentColor' }: GaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw background arc
    ctx.beginPath();
    ctx.arc(size/2, size/2, (size/2) - 20, Math.PI * 0.75, Math.PI * 2.25);
    ctx.strokeStyle = 'hsl(var(--muted))';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Draw value arc
    ctx.beginPath();
    ctx.arc(
      size/2, 
      size/2, 
      (size/2) - 20, 
      Math.PI * 0.75,
      Math.PI * (0.75 + (1.5 * value))
    );
    ctx.strokeStyle = color;
    ctx.lineWidth = 20;
    ctx.stroke();

    // Draw value text
    ctx.font = 'bold 24px Inter';
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${(value * 100).toFixed(0)}%`, size/2, size/2);
  }, [value, size, color]);

  return (
    <canvas 
      ref={canvasRef} 
      width={size} 
      height={size}
      style={{ width: size, height: size }}
    />
  );
}