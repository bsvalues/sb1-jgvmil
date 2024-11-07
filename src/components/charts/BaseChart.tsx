import { ResponsiveContainer } from 'recharts';
import type { ChartProps } from '@/lib/types/chart';

interface BaseChartProps extends ChartProps {
  children: React.ReactNode;
}

export function BaseChart({ height = 300, children }: BaseChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </div>
  );
}