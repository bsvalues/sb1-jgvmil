import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SegmentChart } from '../charts/SegmentChart';
import { SegmentMetrics } from './SegmentMetrics';
import type { MarketSegment } from '@/types/market';

interface MarketSegmentationViewProps {
  segments: MarketSegment[];
}

export const MarketSegmentationView = ({ segments }: MarketSegmentationViewProps) => {
  const priceSegments = segments.filter(s => 
    ['Entry Level', 'Mid Range', 'Upper Mid', 'Luxury', 'Ultra Luxury'].includes(s.name)
  );
  
  const locationSegments = segments.filter(s => 
    !['Entry Level', 'Mid Range', 'Upper Mid', 'Luxury', 'Ultra Luxury'].includes(s.name)
  );

  return (
    <Tabs defaultValue="price" className="space-y-4">
      <TabsList>
        <TabsTrigger value="price">Price Segments</TabsTrigger>
        <TabsTrigger value="location">Location Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="price">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Segment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <SegmentChart segments={priceSegments} />
            </CardContent>
          </Card>
          
          <SegmentMetrics segments={priceSegments} />
        </div>
      </TabsContent>

      <TabsContent value="location">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Location Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <SegmentChart 
                segments={locationSegments} 
                layout="vertical"
                height={400}
              />
            </CardContent>
          </Card>
          
          <SegmentMetrics segments={locationSegments} />
        </div>
      </TabsContent>
    </Tabs>
  );
};