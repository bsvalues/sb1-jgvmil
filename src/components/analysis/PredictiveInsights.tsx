import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Gauge } from '../charts/Gauge';
import { TrendArrow } from '../charts/TrendArrow';
import type { PredictiveMetrics } from '@/types/market';

interface PredictiveInsightsProps {
  metrics: PredictiveMetrics;
}

export const PredictiveInsights = ({ metrics }: PredictiveInsightsProps) => {
  const marketStrengthColor = metrics.marketStrength > 0.66 
    ? 'text-green-500' 
    : metrics.marketStrength > 0.33 
      ? 'text-yellow-500' 
      : 'text-red-500';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Market Strength Index</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <Gauge 
              value={metrics.marketStrength} 
              size={200}
              color={marketStrengthColor}
            />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Supply/Demand Index</span>
              <span>{(metrics.supplyDemandIndex * 100).toFixed(1)}%</span>
            </div>
            <Progress value={metrics.supplyDemandIndex * 100} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <TrendArrow 
              value={metrics.priceTrend} 
              size={150}
              confidence={metrics.confidence}
            />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Seasonal Adjustment</span>
              <span>{(metrics.seasonalAdjustment * 100).toFixed(1)}%</span>
            </div>
            <Progress value={metrics.seasonalAdjustment * 100} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};