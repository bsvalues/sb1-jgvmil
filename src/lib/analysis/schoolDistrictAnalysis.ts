import type { PropertyData, SchoolDistrictMetrics } from '@/types/market';

export const analyzeSchoolDistricts = (
  properties: PropertyData[]
): SchoolDistrictMetrics[] => {
  const districts = groupBySchoolDistrict(properties);
  
  return Object.entries(districts).map(([districtId, props]) => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    
    const currentYearProps = props.filter(p => 
      new Date(p.soldDate || p.listDate).getFullYear() === currentYear
    );
    
    const lastYearProps = props.filter(p => 
      new Date(p.soldDate || p.listDate).getFullYear() === lastYear
    );

    const medianPrice = calculateMedianPrice(currentYearProps);
    const lastYearMedian = calculateMedianPrice(lastYearProps);
    const yearOverYearChange = calculatePercentageChange(medianPrice, lastYearMedian);

    return {
      districtId,
      name: props[0].schoolDistrict,
      rating: calculateDistrictRating(props),
      priceImpact: calculatePriceImpact(props, properties),
      avgDaysOnMarket: calculateAverageDOM(props),
      medianPrice,
      yearOverYearChange,
      properties: props.length
    };
  });
};

const calculateDistrictRating = (properties: PropertyData[]): number => {
  // Complex rating algorithm based on:
  // - Price trends
  // - Sales velocity
  // - Price stability
  // - Market demand
  const metrics = {
    priceTrend: calculatePriceTrend(properties),
    salesVelocity: calculateSalesVelocity(properties),
    priceStability: calculatePriceStability(properties),
    demandScore: calculateDemandScore(properties)
  };

  return weightedAverage([
    [metrics.priceTrend, 0.3],
    [metrics.salesVelocity, 0.25],
    [metrics.priceStability, 0.25],
    [metrics.demandScore, 0.2]
  ]);
};

const calculatePriceImpact = (
  districtProperties: PropertyData[],
  allProperties: PropertyData[]
): number => {
  const districtMedian = calculateMedianPrice(districtProperties);
  const overallMedian = calculateMedianPrice(allProperties);
  
  return ((districtMedian - overallMedian) / overallMedian) * 100;
};