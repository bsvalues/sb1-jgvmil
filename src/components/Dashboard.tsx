import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MarketMetrics } from './metrics/MarketMetrics';
import { AnalysisTabs } from './analysis/AnalysisTabs';
import { DashboardHeader } from './DashboardHeader';
import { DataImport } from './data/DataImport';
import { useDataStore } from '@/lib/data/dataStore';

export function Dashboard() {
  const [loading, setLoading] = useState(false);
  const { 
    filteredProperties: properties,
    filters,
    metrics,
    updateFilters 
  } = useDataStore();

  const handleFilterChange = (newFilters: any) => {
    setLoading(true);
    updateFilters(newFilters);
    setTimeout(() => setLoading(false), 500);
  };

  const marketData = {
    currentMetrics: metrics || {
      activeListings: 0,
      averageDOM: 0,
      medianPrice: 0,
      averagePricePerSqft: 0,
      totalVolume: 0,
      listToSoldRatio: 0,
      inventoryMonths: 0
    },
    trends: properties
      .filter(p => p.status === 'Sold' && p.soldDate)
      .sort((a, b) => new Date(a.soldDate!).getTime() - new Date(b.soldDate!).getTime())
      .map(p => ({
        month: new Date(p.soldDate!).toLocaleDateString('en-US', { month: 'short' }),
        medianPrice: p.soldPrice || p.price
      })),
    regions: Array.from(new Set(properties.map(p => p.address.city)))
      .map(city => ({
        name: city,
        medianPrice: calculateMedianPrice(
          properties.filter(p => p.address.city === city)
        )
      }))
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <main className="container mx-auto p-6 space-y-6">
        <DataImport />

        {properties.length > 0 ? (
          <>
            <Card className="p-6">
              <MarketMetrics 
                data={marketData.currentMetrics} 
                loading={loading}
              />
            </Card>

            <AnalysisTabs 
              data={marketData} 
              loading={loading}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No Data Available</h2>
            <p className="text-muted-foreground">
              Import your CSV data using the button above to begin analysis.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function calculateMedianPrice(properties: any[]): number {
  if (!properties.length) return 0;
  const prices = properties
    .map(p => p.soldPrice || p.price)
    .sort((a, b) => a - b);
  const mid = Math.floor(prices.length / 2);
  return prices.length % 2 === 0
    ? (prices[mid - 1] + prices[mid]) / 2
    : prices[mid];
}