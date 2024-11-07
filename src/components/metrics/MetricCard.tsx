import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MarketMetric } from '@/types/market';

interface MetricCardProps {
  metric: MarketMetric;
}

export const MetricCard = ({ metric }: MetricCardProps) => {
  const formattedValue = metric.prefix ? `${metric.prefix}${metric.value}` : metric.value;
  const displayValue = metric.suffix ? `${formattedValue}${metric.suffix}` : formattedValue;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {metric.label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-blue-600">{displayValue}</p>
      </CardContent>
    </Card>
  );
};