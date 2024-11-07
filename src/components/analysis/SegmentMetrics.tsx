import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatValue } from '@/lib/utils';
import type { MarketSegment } from '@/types/market';

interface SegmentMetricsProps {
  segments: MarketSegment[];
}

export function SegmentMetrics({ segments }: SegmentMetricsProps) {
  return (
    <div className="grid gap-4">
      {segments.map(segment => (
        <Card key={segment.name}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{segment.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {segment.properties} properties
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatValue(segment.medianPrice)}</p>
                  <p className={`text-sm ${
                    segment.priceChange >= 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {segment.priceChange >= 0 ? '+' : ''}
                    {segment.priceChange.toFixed(1)}% YoY
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Inventory</span>
                    <span>{segment.inventory} units</span>
                  </div>
                  <Progress value={(segment.inventory / segment.properties) * 100} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Absorption Rate</span>
                    <span>{segment.absorption.toFixed(1)} months</span>
                  </div>
                  <Progress 
                    value={Math.min((6 / segment.absorption) * 100, 100)} 
                    className="bg-blue-100"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}