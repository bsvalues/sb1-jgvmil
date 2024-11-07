import { useEffect, useRef } from 'react';

interface TrendArrowProps {
  value: number;
  size?: number;
  confidence?: number;
}

export function TrendArrow({ value, size = 150, confidence = 1 }: TrendArrowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Calculate arrow properties
    const angle = (value * 90 + 90) * Math.PI / 180;
    const center = size / 2;
    const radius = (size / 2) - 20;

    // Draw confidence circle
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(var(--muted), ${confidence})`;
    ctx.fill();

    // Draw arrow
    ctx.beginPath();
    ctx.moveTo(
      center + Math.cos(angle + Math.PI) * radius * 0.5,
      center + Math.sin(angle + Math.PI) * radius * 0.5
    );
    ctx.lineTo(
      center + Math.cos(angle) * radius,
      center + Math.sin(angle) * radius
    );
    ctx.lineWidth = 4;
    ctx.strokeStyle = value >= 0 ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
    ctx.stroke();

    // Draw arrowhead
    const headlen = 15;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    
    ctx.beginPath();
    ctx.moveTo(
      center + dx * radius,
      center + dy * radius
    );
    ctx.lineTo(
      center + dx * radius - headlen * Math.cos(angle - Math.PI / 6),
      center + dy * radius - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      center + dx * radius - headlen * Math.cos(angle + Math.PI / 6),
      center + dy * radius - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = value >= 0 ? 'hsl(var(--success))' : 'hsl(var(--destructive))';
    ctx.fill();

  }, [value, size, confidence]);

  return (
    <canvas 
      ref={canvasRef} 
      width={size} 
      height={size}
      style={{ width: size, height: size }}
    />
  );
}