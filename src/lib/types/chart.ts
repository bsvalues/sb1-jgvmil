export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface NeighborhoodDataPoint {
  name: string;
  medianPrice: number;
}

export interface ChartProps {
  height?: number;
  className?: string;
}

export interface ChartAxisProps extends Record<string, any> {
  dataKey?: string;
  tickFormatter?: (value: any) => string;
  orientation?: 'left' | 'right' | 'top' | 'bottom';
  type?: 'number' | 'category';
  width?: number;
  height?: number;
  padding?: { left?: number; right?: number };
  className?: string;
  xAxisId?: string;
  yAxisId?: string;
}