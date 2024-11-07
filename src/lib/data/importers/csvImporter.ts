import { parse } from 'papaparse';

export interface RawPropertyData {
  Status: string;
  Address: string;
  'Listing Price': string;
  'Selling Price'?: string;
  'Year Built': string;
  'Square Footage': string;
  'Lot Size - Acres': string;
  'Listing Date': string;
  'Pending Date'?: string;
  'Selling Date'?: string;
  City: string;
  State: string;
  'Zip Code': string;
  Neighborhood?: string;
  Community?: string;
}

export interface Property {
  id: string;
  status: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  price: number;
  soldPrice: number | null;
  yearBuilt: number;
  squareFootage: number;
  lotSize: number;
  listDate: string;
  pendingDate: string | null;
  soldDate: string | null;
  daysOnMarket: number;
  pricePerSqft: number;
}

export function parseCSVData(csvContent: string): Property[] {
  const { data } = parse<RawPropertyData>(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
    transform: (value) => value?.trim() ?? ''
  });

  return data.map((row): Property => {
    const listDate = new Date(row['Listing Date']);
    const pendingDate = row['Pending Date'] ? new Date(row['Pending Date']) : null;
    const soldDate = row['Selling Date'] ? new Date(row['Selling Date']) : null;
    
    const price = parseFloat(row['Listing Price'].replace(/[^0-9.-]+/g, '')) || 0;
    const soldPrice = row['Selling Price'] 
      ? parseFloat(row['Selling Price'].replace(/[^0-9.-]+/g, ''))
      : null;
    const squareFootage = parseInt(row['Square Footage']) || 0;

    return {
      id: Math.random().toString(36).slice(2),
      status: row.Status,
      address: {
        street: row.Address,
        city: row.City,
        state: row.State,
        zip: row['Zip Code']
      },
      price,
      soldPrice,
      yearBuilt: parseInt(row['Year Built']) || 0,
      squareFootage,
      lotSize: parseFloat(row['Lot Size - Acres']) || 0,
      listDate: listDate.toISOString(),
      pendingDate: pendingDate?.toISOString() || null,
      soldDate: soldDate?.toISOString() || null,
      daysOnMarket: calculateDaysOnMarket(listDate, soldDate || pendingDate || new Date()),
      pricePerSqft: squareFootage > 0 ? Math.round(price / squareFootage) : 0
    };
  });
}

function calculateDaysOnMarket(listDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - listDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}