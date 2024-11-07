import type { PropertyData, MortgageImpact } from '@/types/market';

export const analyzeMortgageImpact = (
  properties: PropertyData[],
  currentRate: number
): MortgageImpact => {
  const medianPrice = calculateMedianPrice(properties);
  const monthlyPayment = calculateMonthlyPayment(medianPrice, currentRate);
  const affordability = calculateAffordabilityIndex(monthlyPayment);
  const buyingPower = calculateBuyingPower(currentRate);
  const priceEffect = calculatePriceEffect(currentRate);

  return {
    rate: currentRate,
    monthlyPayment,
    affordabilityIndex: affordability,
    buyingPower,
    priceEffect
  };
};

const calculateMonthlyPayment = (
  price: number,
  rate: number,
  downPayment = 0.20,
  term = 30
): number => {
  const principal = price * (1 - downPayment);
  const monthlyRate = rate / 12 / 100;
  const payments = term * 12;

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
    (Math.pow(1 + monthlyRate, payments) - 1)
  );
};

const calculateAffordabilityIndex = (monthlyPayment: number): number => {
  const medianIncome = 75000; // Replace with actual median income data
  const monthlyIncome = medianIncome / 12;
  const maxPayment = monthlyIncome * 0.28; // 28% DTI ratio
  
  return maxPayment / monthlyPayment;
};

const calculateBuyingPower = (currentRate: number): number => {
  const baseRate = 3.5; // Historical baseline rate
  const monthlyPayment = 2000; // Example target payment
  
  const basePurchasePrice = calculateMaxPurchasePrice(monthlyPayment, baseRate);
  const currentPurchasePrice = calculateMaxPurchasePrice(monthlyPayment, currentRate);
  
  return (currentPurchasePrice - basePurchasePrice) / basePurchasePrice;
};

const calculatePriceEffect = (currentRate: number): number => {
  // Calculate the expected price adjustment needed to maintain
  // the same monthly payment as rates change
  const baseRate = 3.5;
  const basePrice = 400000;
  const basePayment = calculateMonthlyPayment(basePrice, baseRate);
  
  // Find the price that gives the same payment at current rates
  const adjustedPrice = findPriceForPayment(basePayment, currentRate);
  
  return (adjustedPrice - basePrice) / basePrice;
};