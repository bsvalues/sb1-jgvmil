import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PROPERTY_TYPES, PRICE_RANGES, STATUS_OPTIONS } from '@/lib/constants';
import type { FilterState } from '@/types/market';

interface MarketFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function MarketFilters({ filters, onFilterChange }: MarketFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Select
        value={filters.propertyType}
        onValueChange={(value) => onFilterChange({ ...filters, propertyType: value })}
      >
        <SelectTrigger className="w-[180px] bg-white text-black">
          <SelectValue placeholder="Property Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
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

      <Select
        value={filters.timeframe}
        onValueChange={(value) => onFilterChange({ ...filters, timeframe: value })}
      >
        <SelectTrigger className="w-[180px] bg-white text-black">
          <SelectValue placeholder="Timeframe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3m">3 Months</SelectItem>
          <SelectItem value="6m">6 Months</SelectItem>
          <SelectItem value="12m">12 Months</SelectItem>
          <SelectItem value="ytd">Year to Date</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}</content>