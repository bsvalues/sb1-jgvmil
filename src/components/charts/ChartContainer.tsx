import { cn } from '@/lib/utils';
import { ChartProps } from '@/lib/types/chart';

interface ChartContainerProps extends ChartProps {
  children: React.ReactNode;
}

export function ChartContainer({ 
  height = 300, 
  className,
  children 
}: ChartContainerProps) {
  return (
    <div className={cn('h-[300px] w-full', className)} style={{ height }}>
      {children}
    </div>
  );
}