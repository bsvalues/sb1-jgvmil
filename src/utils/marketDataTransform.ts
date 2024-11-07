import type { PropertyData, MarketMetrics, MarketTrends, RegionData } from '@/types/market';

export const calculateMetrics = (properties: PropertyData[]): MarketMetrics => {
  const active = properties.filter(p => p.status === 'Active');
  const sold = properties.filter(p => p.status === 'Sold' && p.soldPrice);
  
  const averageDOM = Math.round(
    properties.reduce((acc, p) => acc + p.daysOnMarket, 0) / properties.length
  );

  const medianPrice = calculateMedian(active.map(p => p.price));
  
  const averagePricePerSqft = Math.round(
    active.reduce((acc, p) => acc + p.pricePerSqft, 0) / active.length
  );

  const totalVolume = active.reduce((acc, p) => acc + p.price, 0);

  const listToSoldRatio = sold.length > 0 
    ? sold.reduce((acc, p) => acc + (p.soldPrice! / p.price), 0) / sold.length 
    : 1;

  const monthlyRate = sold.length / 6; // Based on 6 months of data
  const inventoryMonths = active.length / monthlyRate;

  return {
    activeListings: active.length,
    averageDOM,
    medianPrice,
    averagePricePerSqft,
    totalVolume,
    averageListToSold: listToSoldRatio,
    inventoryMonths: Math.round(inventoryMonths * 10) / 10
  };
};

const calculateMedian = (numbers: number[]): number => {
  const sorted = numbers.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
};

export const calculateTrends = (properties: PropertyData[]): MarketTrends[] => {
  // Group by month and calculate metrics
  const monthlyData = properties.reduce((acc, property) => {
    const date = new Date(property.listDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        prices: [],
        dom: [],
        count: 0
      };
    }
    
    acc[monthKey].prices.push(property.price);
    acc[monthKey].dom.push(property.daysOnMarket);
    acc[monthKey].count++;
    
    return acc;
  }, {} as Record<string, { prices: number[], dom: number[], count: number }>);

  return Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      medianPrice: calculateMedian(data.prices),
      totalSales: data.count,
      averageDOM: Math.round(data.dom.reduce((a, b) => a + b, 0) / data.dom.length)
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

export const calculateRegionData = (properties: PropertyData[]): RegionData[] => {
  const regionMap = properties.reduce((acc, property) => {
    if (!acc[property.city]) {
      acc[property.city] = {
        properties: [],
        active: 0
      };
    }
    
    acc[property.city].properties.push(property);
    if (property.status === 'Active') {
      acc[property.city].active++;
    }
    
    return acc;
  }, {} as Record<string, { properties: PropertyData[], active: number }>);

  return Object.entries(regionMap).map(([city, data]) => ({
    name: city,
    activeListings: data.active,
    medianPrice: calculateMedian(data.properties.map(p => p.price)),
    averageDOM: Math.round(
      data.properties.reduce((acc, p) => acc + p.daysOnMarket, 0) / data.properties.length
    )
  }));
};