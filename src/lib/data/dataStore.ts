import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Property } from './importers/csvImporter';
import { calculateMarketMetrics } from './analysis/marketMetrics';

interface FilterState {
  county: string;
  city: string;
  propertyType: string;
  priceRange: string;
  status: string;
  timeframe: string;
}

interface DataState {
  properties: Property[];
  filters: FilterState;
  filteredProperties: Property[];
  metrics: ReturnType<typeof calculateMarketMetrics> | null;
  setProperties: (properties: Property[]) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  clearData: () => void;
}

const initialFilters: FilterState = {
  county: 'all',
  city: 'all',
  propertyType: 'all',
  priceRange: 'all',
  status: 'all',
  timeframe: '6m'
};

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      properties: [],
      filters: initialFilters,
      filteredProperties: [],
      metrics: null,

      setProperties: (properties) => {
        set({ properties });
        const state = get();
        const filtered = filterProperties(properties, state.filters);
        const metrics = calculateMarketMetrics(filtered);
        set({ filteredProperties: filtered, metrics });
      },

      updateFilters: (newFilters) => {
        const filters = { ...get().filters, ...newFilters };
        const filtered = filterProperties(get().properties, filters);
        const metrics = calculateMarketMetrics(filtered);
        set({ filters, filteredProperties: filtered, metrics });
      },

      clearData: () => {
        set({ 
          properties: [], 
          filteredProperties: [], 
          metrics: null,
          filters: initialFilters 
        });
      }
    }),
    {
      name: 'real-estate-data'
    }
  )
);

function filterProperties(properties: Property[], filters: FilterState): Property[] {
  return properties.filter(property => {
    // Apply filters
    if (filters.status !== 'all' && property.status !== filters.status) {
      return false;
    }

    if (filters.city !== 'all' && property.address.city !== filters.city) {
      return false;
    }

    if (filters.timeframe !== 'all') {
      const date = property.soldDate || property.pendingDate || property.listDate;
      const months = parseInt(filters.timeframe);
      if (!isWithinMonths(new Date(date), months)) {
        return false;
      }
    }

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (property.price < min || (max && property.price > max)) {
        return false;
      }
    }

    return true;
  });
}

function isWithinMonths(date: Date, months: number): boolean {
  const now = new Date();
  const monthsAgo = new Date();
  monthsAgo.setMonth(now.getMonth() - months);
  return date >= monthsAgo;
}