import { BarChart, Bar, CartesianGrid, Tooltip } from 'recharts';
import { BaseChart } from './BaseChart';
import { XAxis, YAxis } from './ChartAxis';
import { ChartTooltip } from './ChartTooltip';
import { formatValue } from '@/lib/utils';
import type { ChartProps } from '@/lib/types/chart';

interface NeighborhoodChartProps extends ChartProps {
  data: Array<{
    name: string;
    medianPrice: number;
  }>;
  layout?: 'horizontal' | 'vertical';
}

export function NeighborhoodChart({ 
  data, 
  layout = 'horizontal',
  height = 300
}: NeighborhoodChartProps) {
  if (!data?.length) {
    return null;
  }

  const margin = layout === 'horizontal' 
    ? { top: 10, right: 30, left: 10, bottom: 20 }
    : { top: 10, right: 30, left: 100, bottom: 0 };

  return (
    <BaseChart height={height}>
      <BarChart
        data={data}
        layout={layout}
        margin={margin}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        {layout === 'horizontal' ? (
          <>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatValue} />
          </>
        ) : (
          <>
            <XAxis 
              type="number" 
              tickFormatter={formatValue}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={90}
            />
          </>
        )}
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
        <Bar
          dataKey="medianPrice"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
          barSize={layout === 'horizontal' ? 30 : 20}
        />
      </BarChart>
    </BaseChart>
  );
}