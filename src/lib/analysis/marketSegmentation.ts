import type { PropertyData, MarketSegment } from '@/types/market';

export const analyzeMarketSegments = (properties: PropertyData[]): MarketSegment[] => {
  // Segment by price ranges
  const priceSegments = segmentByPriceRange(properties);
  
  // Segment by property type
  const typeSegments = segmentByPropertyType(properties);
  
  // Segment by location
  const locationSegments = segmentByLocation(properties);
  
  return [...priceSegments, ...typeSegments, ...locationSegments];
};

const segmentByPriceRange = (properties: PropertyData[]): MarketSegment[] => {
  const ranges = [
    { min: 0, max: 300000, name: 'Entry Level' },
    { min: 300000, max: 500000, name: 'Mid Range' },
    { min: 500000, max: 750000, name: 'Upper Mid' },
    { min: 750000, max: 1000000, name: 'Luxury' },
    { min: 1000000, max: Infinity, name: 'Ultra Luxury' }
  ];

  return ranges.map(range => {
    const segmentProperties = properties.filter(
      p => p.price >= range.min && p.price < range.max
    );

    return calculateSegmentMetrics(segmentProperties, range.name);
  });
};

const segmentByPropertyType = (properties: PropertyData[]): MarketSegment[] => {
  const types = new Set(properties.map(p => p.propertyType));
  
  return Array.from(types).map(type => {
    const segmentProperties = properties.filter(p => p.propertyType === type);
    return calculateSegmentMetrics(segmentProperties, type);
  });
};

const segmentByLocation = (properties: PropertyData[]): MarketSegment[] => {
  const cities = new Set(properties.map(p => p.city));
  
  return Array.from(cities).map(city => {
    const segmentProperties = properties.filter(p => p.city === city);
    return calculateSegmentMetrics(segmentProperties, city);
  });
};

const calculateSegmentMetrics = (
  properties: PropertyData[], 
  name: string
): MarketSegment => {
  const active = properties.filter(p => p.status === 'Active');
  const sold = properties.filter(p => p.status === 'Sold' && p.soldPrice);
  
  const medianPrice = calculateMedian(properties.map(p => p.price));
  const averageDOM = Math.round(
    properties.reduce((sum, p) => sum + p.daysOnMarket, 0) / properties.length
  );
  
  const monthlyRate = sold.length / 6;
  const absorption = monthlyRate === 0 ? 0 : active.length / monthlyRate;
  
  const priceChange = calculatePriceChange(properties);

  return {
    name,
    properties: properties.length,
    medianPrice,
    averageDOM,
    inventory: active.length,
    absorption,
    priceChange
  };
};