import type { PropertyData, PredictiveMetrics } from '@/types/market';

export const generatePredictions = (properties: PropertyData[]): PredictiveMetrics => {
  const priceTrend = calculatePriceTrend(properties);
  const seasonalAdjustment = calculateSeasonalAdjustment(properties);
  const marketStrength = calculateMarketStrength(properties);
  const supplyDemandIndex = calculateSupplyDemandIndex(properties);
  
  // Calculate confidence based on data quality and sample size
  const confidence = calculateConfidence(properties);

  return {
    priceTrend,
    confidence,
    seasonalAdjustment,
    marketStrength,
    supplyDemandIndex
  };
};

const calculatePriceTrend = (properties: PropertyData[]): number => {
  const monthlyPrices = groupByMonth(properties);
  const trend = linearRegression(monthlyPrices);
  return trend.slope;
};

const calculateSeasonalAdjustment = (properties: PropertyData[]): number => {
  const monthlyVolumes = groupByMonth(properties, 'volume');
  const seasonalFactors = calculateSeasonalFactors(monthlyVolumes);
  return seasonalFactors[new Date().getMonth()];
};

const calculateMarketStrength = (properties: PropertyData[]): number => {
  const active = properties.filter(p => p.status === 'Active');
  const sold = properties.filter(p => p.status === 'Sold');
  
  const absorptionRate = sold.length / 6; // 6-month average
  const monthsOfInventory = active.length / absorptionRate;
  const medianDOM = calculateMedianDOM(properties);
  
  // Normalize and combine factors
  return normalizeScore(
    (1 / monthsOfInventory) * 0.4 + 
    (1 / medianDOM) * 0.3 + 
    (absorptionRate / active.length) * 0.3
  );
};

const calculateSupplyDemandIndex = (properties: PropertyData[]): number => {
  const active = properties.filter(p => p.status === 'Active');
  const pending = properties.filter(p => p.status === 'Pending');
  const sold = properties.filter(p => p.status === 'Sold');
  
  const newListings = properties.filter(
    p => new Date(p.listDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;
  
  const demandScore = (pending.length + sold.length) / active.length;
  const supplyScore = newListings / active.length;
  
  return normalizeScore(demandScore - supplyScore);
};

const calculateConfidence = (properties: PropertyData[]): number => {
  const sampleSize = properties.length;
  const dataCompleteness = calculateDataCompleteness(properties);
  const variability = calculateVariability(properties);
  
  return normalizeScore(
    (Math.min(sampleSize, 100) / 100) * 0.4 +
    dataCompleteness * 0.3 +
    (1 - variability) * 0.3
  );
};