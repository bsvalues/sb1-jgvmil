import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTIES, CITIES, PROPERTY_TYPES, PRICE_RANGES, STATUS_OPTIONS } from '@/lib/constants';
import type { FilterState } from '@/types/market';

interface DashboardHeaderProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function DashboardHeader({ filters, onFilterChange }: DashboardHeaderProps) {
  const selectedCounty = COUNTIES.find(c => c.id === filters.county);
  const availableCities = selectedCounty ? CITIES[selectedCounty.id] : [];

  return (
    <div className="bg-blue-600 text-white p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Southeastern Washington Market Analysis</h1>
        <div className="flex flex-wrap gap-4">
          <Select 
            value={filters.county} 
            onValueChange={(value) => onFilterChange({ ...filters, county: value, city: 'all' })}
          >
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder="Select County" />
            </SelectTrigger>
            <SelectContent>
              {COUNTIES.map(county => (
                <SelectItem key={county.id} value={county.id}>
                  {county.name} County
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.city} 
            onValueChange={(value) => onFilterChange({ ...filters, city: value })}
          >
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {availableCities.map(city => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.propertyType} 
            onValueChange={(value) => onFilterChange({ ...filters, propertyType: value })}
          >
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.priceRange} 
            onValueChange={(value) => onFilterChange({ ...filters, priceRange: value })}
          >
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_RANGES.map(range => (
                <SelectItem key={range.id} value={range.id}>
                  {range.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filters.status} 
            onValueChange={(value) => onFilterChange({ ...filters, status: value })}
          >
            <SelectTrigger className="w-[180px] bg-white text-black">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(status => (
                <SelectItem key={status.id} value={status.id}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}