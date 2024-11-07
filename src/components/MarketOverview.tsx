import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketSummaryChart } from './charts/MarketSummaryChart';
import { MarketStats } from './MarketStats';
import type { MarketData } from '@/types/market';

interface MarketOverviewProps {
  data: MarketData;
}

export const MarketOverview = ({ data }: MarketOverviewProps) => {
  const marketCondition = data.currentMetrics.inventoryMonths < 6 
    ? "Seller's Market" 
    : data.currentMetrics.inventoryMonths > 6 
      ? "Buyer's Market" 
      : "Balanced Market";

  const priceDirection = data.currentMetrics.medianPrice > data.previousMetrics.medianPrice
    ? "increasing"
    : "decreasing";

  const summary = `The market is currently a ${marketCondition.toLowerCase()} with prices ${priceDirection} 
    compared to the previous period. Inventory levels are at ${data.currentMetrics.inventoryMonths} months.`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <p className="text-muted-foreground">{summary}</p>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <MarketSummaryChart data={data.trends} />
        <MarketStats 
          current={data.currentMetrics} 
          previous={data.previousMetrics} 
        />
      </CardContent>
    </Card>
  );
};