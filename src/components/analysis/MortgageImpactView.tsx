import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatValue } from '@/lib/utils';
import type { MortgageImpact } from '@/types/market';

interface MortgageImpactViewProps {
  impact: MortgageImpact;
}

export const MortgageImpactView = ({ impact }: MortgageImpactViewProps) => (
  <div className="grid gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Mortgage Rate Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Current Rate: {impact.rate}%</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Monthly Payment</span>
                    <span>{formatValue(impact.monthlyPayment)}</span>
                  </div>
                  <Progress value={impact.affordabilityIndex * 100} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Affordability Impact</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Buying Power</span>
                    <span>{impact.buyingPower >= 0 ? '+' : ''}
                      {(impact.buyingPower * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={50 + impact.buyingPower * 50} 
                    className="bg-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Market Effect</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Price Impact</span>
                    <span>{impact.priceEffect >= 0 ? '+' : ''}
                      {(impact.priceEffect * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={50 + impact.priceEffect * 50} 
                    className="bg-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Market Insight</h4>
              <p className="text-sm text-muted-foreground">
                {impact.priceEffect >= 0 
                  ? `Current rates are supporting price growth, with a positive impact of ${(impact.priceEffect * 100).toFixed(1)}% on home values.`
                  : `Current rates are creating downward pressure, with an estimated ${Math.abs(impact.priceEffect * 100).toFixed(1)}% impact on home values.`
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);