import type { Property } from '../importers/csvImporter';

export interface MarketMetrics {
  activeListings: number;
  averageDOM: number;
  medianPrice: number;
  averagePricePerSqft: number;
  totalVolume: number;
  listToSoldRatio: number;
  inventoryMonths: number;
}

export function calculateMarketMetrics(properties: Property[]): MarketMetrics {
  const active = properties.filter(p => p.status === 'Active');
  const sold = properties.filter(p => p.status === 'Sold' && p.soldPrice);
  
  const medianPrice = calculateMedianPrice(active);
  const averageDOM = calculateAverageDOM(properties);
  const averagePricePerSqft = calculateAveragePricePerSqft(active);
  const totalVolume = calculateTotalVolume(active);
  const listToSoldRatio = calculateListToSoldRatio(sold);
  const inventoryMonths = calculateInventoryMonths(active, sold);

  return {
    activeListings: active.length,
    averageDOM,
    medianPrice,
    averagePricePerSqft,
    totalVolume,
    listToSoldRatio,
    inventoryMonths
  };
}

function calculateMedianPrice(properties: Property[]): number {
  if (!properties.length) return 0;
  
  const prices = properties.map(p => p.price).sort((a, b) => a - b);
  const mid = Math.floor(prices.length / 2);
  
  return prices.length % 2 === 0
    ? (prices[mid - 1] + prices[mid]) / 2
    : prices[mid];
}

function calculateAverageDOM(properties: Property[]): number {
  if (!properties.length) return 0;
  return Math.round(
    properties.reduce((sum, p) => sum + p.daysOnMarket, 0) / properties.length
  );
}

function calculateAveragePricePerSqft(properties: Property[]): number {
  if (!properties.length) return 0;
  return Math.round(
    properties.reduce((sum, p) => sum + p.pricePerSqft, 0) / properties.length
  );
}

function calculateTotalVolume(properties: Property[]): number {
  return properties.reduce((sum, p) => sum + p.price, 0);
}

function calculateListToSoldRatio(soldProperties: Property[]): number {
  if (!soldProperties.length) return 1;
  
  const total = soldProperties.reduce((sum, p) => sum + (p.soldPrice! / p.price), 0);
  return total / soldProperties.length;
}

function calculateInventoryMonths(active: Property[], sold: Property[]): number {
  // Calculate based on last 6 months of sales
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const recentSales = sold.filter(p => 
    p.soldDate && new Date(p.soldDate) >= sixMonthsAgo
  );
  
  const monthlyRate = recentSales.length / 6;
  if (monthlyRate === 0) return 99; // Effectively infinite inventory
  
  return Math.round((active.length / monthlyRate) * 10) / 10;
}