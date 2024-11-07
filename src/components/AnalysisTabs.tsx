import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PriceTrendChart } from './charts/PriceTrendChart';
import { NeighborhoodChart } from './charts/NeighborhoodChart';
import type { MarketData } from '@/types/market';

interface AnalysisTabsProps {
  data: MarketData;
  loading?: boolean;
}

export function AnalysisTabs({ data, loading }: AnalysisTabsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-[300px]" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Tabs defaultValue="market" className="space-y-4">
      <TabsList>
        <TabsTrigger value="market">Market Analysis</TabsTrigger>
        <TabsTrigger value="region">Regional Analysis</TabsTrigger>
        <TabsTrigger value="trends">Price Trends</TabsTrigger>
      </TabsList>

      <TabsContent value="market">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <PriceTrendChart data={data.trends} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <NeighborhoodChart data={data.regions} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="region">
        <Card>
          <CardHeader>
            <CardTitle>Regional Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <NeighborhoodChart 
              data={data.regions} 
              layout="vertical" 
              height={400} 
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trends">
        <Card>
          <CardHeader>
            <CardTitle>Price Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <PriceTrendChart data={data.trends} height={400} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}</content>