import { Card, CardContent } from '@/components/ui/card';
import { formatValue } from '@/lib/utils';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
  }>;
  label?: string;
}

export function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <Card className="border shadow-lg">
      <CardContent className="p-2">
        {label && <div className="text-sm font-medium mb-1">{label}</div>}
        {payload.map((item) => (
          <div key={item.dataKey} className="text-sm text-muted-foreground">
            {item.name}: {formatValue(item.value)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}