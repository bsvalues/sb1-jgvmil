import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from 'recharts';
import type { ChartAxisProps } from '@/lib/types/chart';

const defaultAxisStyle = {
  stroke: 'currentColor',
  fontSize: 12,
  tickLine: false,
  axisLine: false
};

type XAxisProps = Omit<ChartAxisProps, 'yAxisId'>;
type YAxisProps = Omit<ChartAxisProps, 'xAxisId'>;

export function XAxis({ 
  dataKey = 'name',
  tickFormatter,
  orientation = 'bottom',
  type = 'category',
  padding = { left: 0, right: 0 },
  height,
  className,
  xAxisId = '0',
  ...props 
}: XAxisProps) {
  return (
    <RechartsXAxis
      {...defaultAxisStyle}
      dataKey={dataKey}
      tickFormatter={tickFormatter}
      orientation={orientation}
      type={type}
      padding={padding}
      height={height}
      className={className}
      xAxisId={xAxisId}
      {...props}
    />
  );
}

export function YAxis({ 
  dataKey,
  tickFormatter,
  orientation = 'left',
  type = 'number',
  width = 80,
  className,
  yAxisId = '0',
  ...props 
}: YAxisProps) {
  return (
    <RechartsYAxis
      {...defaultAxisStyle}
      dataKey={dataKey}
      tickFormatter={tickFormatter}
      orientation={orientation}
      type={type}
      width={width}
      className={className}
      yAxisId={yAxisId}
      {...props}
    />
  );
}