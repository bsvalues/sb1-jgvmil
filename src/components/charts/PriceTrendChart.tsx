import { LineChart, Line, CartesianGrid, Tooltip } from 'recharts';
import { BaseChart } from './BaseChart';
import { XAxis, YAxis } from './ChartAxis';
import { ChartTooltip } from './ChartTooltip';
import { formatValue } from '@/lib/utils';
import type { ChartProps } from '@/lib/types/chart';

interface PriceTrendChartProps extends ChartProps {
  data: Array<{
    month: string;
    medianPrice: number;
  }>;
}

export function PriceTrendChart({ data, height = 300 }: PriceTrendChartProps) {
  if (!data?.length) {
    return null;
  }

  return (
    <BaseChart height={height}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="month"
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          tickFormatter={formatValue}
        />
        <Tooltip 
          content={({ active, payload, label }) => (
            <ChartTooltip 
              active={active} 
              payload={payload?.map(p => ({
                ...p,
                name: 'Median Price',
                value: p.value as number
              }))}
              label={label}
            />
          )}
        />
        <Line
          type="monotone"
          dataKey="medianPrice"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
        />
      </LineChart>
    </BaseChart>
  );
}