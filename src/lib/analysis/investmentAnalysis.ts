import type { PropertyData, InvestmentMetrics } from '@/types/market';

export const calculateInvestmentMetrics = (
  properties: PropertyData[]
): InvestmentMetrics => {
  const rentalData = estimateRentalData(properties);
  const appreciation = calculateHistoricalAppreciation(properties);
  const risk = assessMarketRisk(properties);

  const metrics = {
    roi: calculateROI(properties, rentalData),
    capRate: calculateCapRate(properties, rentalData),
    cashFlow: calculateCashFlow(properties, rentalData),
    appreciationRate: appreciation.rate,
    rentalDemand: calculateRentalDemand(properties),
    riskScore: risk.score,
    breakEvenTime: calculateBreakEven(properties, rentalData, appreciation)
  };

  return metrics;
};

const calculateROI = (
  properties: PropertyData[], 
  rentalData: RentalEstimates
): number => {
  const annualIncome = rentalData.averageRent * 12;
  const expenses = estimateAnnualExpenses(properties);
  const appreciation = calculateAnnualAppreciation(properties);
  
  const totalReturn = annualIncome - expenses + appreciation;
  const averageInvestment = calculateMedianPrice(properties);
  
  return (totalReturn / averageInvestment) * 100;
};

const calculateCapRate = (
  properties: PropertyData[],
  rentalData: RentalEstimates
): number => {
  const annualIncome = rentalData.averageRent * 12;
  const expenses = estimateAnnualExpenses(properties);
  const noi = annualIncome - expenses;
  
  const propertyValue = calculateMedianPrice(properties);
  
  return (noi / propertyValue) * 100;
};

const calculateRentalDemand = (properties: PropertyData[]): number => {
  // Analyze factors affecting rental demand:
  // - Population growth
  // - Job market
  // - Proximity to amenities
  // - Historical rental vacancy rates
  const factors = {
    populationGrowth: analyzePopulationTrend(),
    jobMarketStrength: analyzeJobMarket(),
    amenityScore: calculateAmenityScore(properties),
    vacancyRate: calculateVacancyRate()
  };

  return weightedAverage([
    [factors.populationGrowth, 0.3],
    [factors.jobMarketStrength, 0.3],
    [factors.amenityScore, 0.2],
    [1 - factors.vacancyRate, 0.2]
  ]);
};