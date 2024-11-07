import { Badge } from '@/components/ui/badge';
import { formatValue, calculateChange } from '@/lib/utils';
import type { MarketMetrics } from '@/types/market';

interface MarketStatsProps {
  current: MarketMetrics;
  previous: MarketMetrics;
}

export const MarketStats = ({ current, previous }: MarketStatsProps) => {
  const stats = [
    {
      label: 'Median Sale Price',
      current: current.medianPrice,
      previous: previous.medianPrice,
      format: (value: number) => formatValue(value)
    },
    {
      label: 'Price per Square Foot',
      current: current.averagePricePerSqft,
      previous: previous.averagePricePerSqft,
      format: (value: number) => formatValue(value)
    },
    {
      label: 'Days on Market',
      current: current.averageDOM,
      previous: previous.averageDOM,
      format: (value: number) => `${value} days`,
      inverseTrend: true
    },
    {
      label: 'List to Sold Ratio',
      current: current.listToSoldRatio,
      previous: previous.listToSoldRatio,
      format: (value: number) => `${(value * 100).toFixed(1)}%`
    }
  ];

  return (
    <div className="space-y-4">
      {stats.map(stat => {
        const change = calculateChange(stat.current, stat.previous);
        const isPositive = stat.inverseTrend ? change < 0 : change > 0;
        
        return (
          <div key={stat.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.format(stat.current)}</p>
            </div>
            <Badge variant={isPositive ? "success" : "destructive"}>
              {change > 0 ? '+' : ''}{change.toFixed(1)}%
            </Badge>
          </div>
        );
      })}
    </div>
  );
};