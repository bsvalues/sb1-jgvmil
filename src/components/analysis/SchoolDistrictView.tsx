import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatValue } from '@/lib/utils';
import type { SchoolDistrictMetrics } from '@/types/market';

interface SchoolDistrictViewProps {
  districts: SchoolDistrictMetrics[];
}

export const SchoolDistrictView = ({ districts }: SchoolDistrictViewProps) => (
  <div className="grid gap-6">
    <Card>
      <CardHeader>
        <CardTitle>School District Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {districts.map(district => (
            <div key={district.districtId} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{district.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {district.properties} properties
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatValue(district.medianPrice)}</p>
                  <p className={`text-sm ${
                    district.yearOverYearChange >= 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {district.yearOverYearChange >= 0 ? '+' : ''}
                    {district.yearOverYearChange.toFixed(1)}% year over year
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>District Rating</span>
                    <span>{(district.rating * 10).toFixed(1)}</span>
                  </div>
                  <Progress value={district.rating * 100} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Price Impact</span>
                    <span>{district.priceImpact >= 0 ? '+' : ''}
                      {district.priceImpact.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={50 + district.priceImpact} 
                    className="bg-blue-100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);