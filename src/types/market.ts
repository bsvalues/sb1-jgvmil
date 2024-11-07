export interface PropertyData {
  id: string;
  status: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    county?: string;
  };
  price: number;
  originalPrice: number;
  soldPrice?: number;
  yearBuilt: number;
  squareFootage: number;
  lotSize: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  listDate: string;
  soldDate?: string;
  daysOnMarket: number;
  cumulativeDaysOnMarket: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface MarketFilters {
  county: string;
  city: string;
  propertyType: string;
  priceRange: string;
  timeframe: string;
  status: string;
}

export interface MarketMetrics {
  activeListings: number;
  averageDOM: number;
  medianPrice: number;
  averagePricePerSqft: number;
  totalVolume: number;
  listToSoldRatio: number;
  inventoryMonths: number;
}

export interface MarketData {
  currentMetrics: MarketMetrics;
  trends: Array<{
    month: string;
    medianPrice: number;
  }>;
  regions: Array<{
    name: string;
    medianPrice: number;
  }>;
}

export interface MarketSegment {
  name: string;
  properties: number;
  medianPrice: number;
  averageDOM: number;
  inventory: number;
  absorption: number;
  priceChange: number;
}

export interface MarketTrend {
  month: string;
  medianPrice: number;
  inventory: number;
  sales: number;
}

export interface InvestmentMetrics {
  roi: number;
  capRate: number;
  cashFlow: number;
  appreciationRate: number;
  rentalDemand: number;
  riskScore: number;
  breakEvenTime: number;
}

export interface MortgageImpact {
  rate: number;
  monthlyPayment: number;
  affordabilityIndex: number;
  buyingPower: number;
  priceEffect: number;
}

export interface PredictiveMetrics {
  priceTrend: number;
  confidence: number;
  seasonalAdjustment: number;
  marketStrength: number;
  supplyDemandIndex: number;
}

export interface SchoolDistrictMetrics {
  districtId: string;
  name: string;
  rating: number;
  priceImpact: number;
  avgDaysOnMarket: number;
  medianPrice: number;
  yearOverYearChange: number;
  properties: number;
}