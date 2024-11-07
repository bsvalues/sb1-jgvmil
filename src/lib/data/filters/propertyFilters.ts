import type { PropertyData, MarketFilters } from '@/types/market';

export function filterProperties(
  properties: PropertyData[],
  filters: MarketFilters
): PropertyData[] {
  return properties.filter(property => {
    // County filter
    if (filters.county !== 'all' && property.address.county !== filters.county) {
      return false;
    }

    // City filter
    if (filters.city !== 'all' && property.address.city !== filters.city) {
      return false;
    }

    // Property type filter
    if (filters.propertyType !== 'all' && 
        property.propertyType !== filters.propertyType) {
      return false;
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = parsePriceRange(filters.priceRange);
      if (property.price < min || (max && property.price > max)) {
        return false;
      }
    }

    // Status filter
    if (filters.status !== 'all' && property.status !== filters.status) {
      return false;
    }

    // Timeframe filter
    if (!isWithinTimeframe(property, filters.timeframe)) {
      return false;
    }

    return true;
  });
}

function parsePriceRange(range: string): [number, number | null] {
  const ranges: Record<string, [number, number | null]> = {
    '0-300000': [0, 300000],
    '300000-500000': [300000, 500000],
    '500000-750000': [500000, 750000],
    '750000-1000000': [750000, 1000000],
    '1000000-plus': [1000000, null]
  };

  return ranges[range] || [0, null];
}

function isWithinTimeframe(property: PropertyData, timeframe: string): boolean {
  const date = property.soldDate || property.listDate;
  if (!date) return false;

  const now = new Date();
  const propertyDate = new Date(date);

  switch (timeframe) {
    case '3m':
      return propertyDate >= new Date(now.setMonth(now.getMonth() - 3));
    case '6m':
      return propertyDate >= new Date(now.setMonth(now.getMonth() - 6));
    case '12m':
      return propertyDate >= new Date(now.setMonth(now.getMonth() - 12));
    case 'ytd':
      return propertyDate.getFullYear() === now.getFullYear();
    default:
      return true;
  }
}