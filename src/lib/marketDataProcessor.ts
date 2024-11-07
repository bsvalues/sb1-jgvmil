import type { FilterState, MarketData } from '@/types/market';

export function processMarketData(rawData: MarketData, filters: FilterState): MarketData {
  // For now, just return the raw data
  // In a real implementation, this would filter and process the data based on the filters
  return rawData;
}