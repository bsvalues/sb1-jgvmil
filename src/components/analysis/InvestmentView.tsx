import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatValue } from '@/lib/utils';
import type { InvestmentMetrics } from '@/types/market';

interface InvestmentViewProps {
  metrics: InvestmentMetrics;
}

export const InvestmentView = ({ metrics }: InvestmentViewProps) => (
  <div className="grid gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Investment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Return Metrics</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>ROI</span>
                    <span>{metrics.roi.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.roi} max={20} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cap Rate</span>
                    <span>{metrics.capRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.capRate * 10} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cash Flow</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatValue(metrics.cashFlow)}/mo
              </p>
              <p className="text-sm text-muted-foreground">
                Estimated monthly net income
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Market Conditions</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Rental Demand</span>
                    <span>{(metrics.rentalDemand * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={metrics.rentalDemand * 100} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Risk Score</span>
                    <span>{metrics.riskScore.toFixed(1)}</span>
                  </div>
                  <Progress 
                    value={100 - metrics.riskScore * 100} 
                    className="bg-red-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Break Even Analysis</h3>
              <p className="text-2xl font-bold">
                {metrics.breakEvenTime.toFixed(1)} years
              </p>
              <p className="text-sm text-muted-foreground">
                Estimated time to recover investment
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);