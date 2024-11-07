import { Skeleton } from '@/components/ui/skeleton';
import { formatValue } from '@/lib/utils';
import type { MarketMetrics as MarketMetricsType } from '@/types/market';

interface MarketMetricsProps {
  data: MarketMetricsType;
  loading?: boolean;
}

export function MarketMetrics({ data, loading }: MarketMetricsProps) {
  const metrics = [
    {
      label: 'Active Listings',
      value: data.activeListings,
      prefix: '',
      suffix: ''
    },
    {
      label: 'Average Days on Market',
      value: data.averageDOM,
      prefix: '',
      suffix: ' days'
    },
    {
      label: 'Median Price',
      value: formatValue(data.medianPrice),
      prefix: '',
      suffix: ''
    },
    {
      label: 'Price per Sq Ft',
      value: formatValue(data.averagePricePerSqft),
      prefix: '',
      suffix: ''
    },
    {
      label: 'Total Volume',
      value: formatValue(data.totalVolume),
      prefix: '',
      suffix: ''
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="p-4 rounded-lg bg-card">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="p-4 rounded-lg bg-card">
          <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
          <p className="text-2xl font-bold text-primary mt-2">
            {metric.prefix}{metric.value}{metric.suffix}
          </p>
        </div>
      ))}
    </div>
  );
}