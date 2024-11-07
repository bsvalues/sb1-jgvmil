import {
  ComposedChart,
  Area,
  Line,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { BaseChart } from './BaseChart';
import { XAxis, YAxis } from './ChartAxis';
import { formatValue } from '@/lib/utils';
import type { MarketTrend } from '@/types/market';

interface MarketSummaryChartProps {
  data: MarketTrend[];
}

export function MarketSummaryChart({ data }: MarketSummaryChartProps) {
  return (
    <BaseChart height={400}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="month" 
          className="text-muted-foreground text-xs"
        />
        <YAxis 
          yAxisId="price"
          tickFormatter={formatValue}
          className="text-muted-foreground text-xs"
        />
        <YAxis 
          yAxisId="count"
          orientation="right"
          className="text-muted-foreground text-xs"
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            
            return (
              <div className="bg-background border rounded-lg shadow-lg p-3">
                {payload.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}:</span>
                    <span>{
                      item.name.includes('Price') 
                        ? formatValue(item.value as number) 
                        : item.value
                    }</span>
                  </div>
                ))}
              </div>
            );
          }}
        />
        <Legend />
        <Area
          yAxisId="count"
          type="monotone"
          dataKey="inventory"
          fill="hsl(var(--chart-1))"
          stroke="hsl(var(--chart-1))"
          fillOpacity={0.3}
          name="Active Inventory"
        />
        <Bar
          yAxisId="count"
          dataKey="sales"
          fill="hsl(var(--chart-2))"
          name="Monthly Sales"
        />
        <Line
          yAxisId="price"
          type="monotone"
          dataKey="medianPrice"
          stroke="hsl(var(--chart-3))"
          strokeWidth={2}
          dot={false}
          name="Median Price"
        />
      </ComposedChart>
    </BaseChart>
  );
}