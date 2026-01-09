/**
 * Demo data file
 *
 * Centralize mock data for demos to keep components clean and data reusable.
 * Export both the actual data and the code string for documentation.
 */

export interface DemoItem {
  id: number;
  name: string;
  description: string;
  value: number;
  status: 'active' | 'inactive' | 'pending';
}

// Code string for documentation
export const dataCode = `
export const data = [
  {
    id: 1,
    name: 'Item One',
    description: 'First demo item with some description',
    value: 100,
    status: 'active',
  },
  {
    id: 2,
    name: 'Item Two',
    description: 'Second demo item with different data',
    value: 250,
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Item Three',
    description: 'Third item in the demo dataset',
    value: 175,
    status: 'pending',
  },
  {
    id: 4,
    name: 'Item Four',
    description: 'Fourth item with additional information',
    value: 320,
    status: 'active',
  },
];
`;

// Actual data
export const data: DemoItem[] = [
  {
    id: 1,
    name: 'Item One',
    description: 'First demo item with some description',
    value: 100,
    status: 'active',
  },
  {
    id: 2,
    name: 'Item Two',
    description: 'Second demo item with different data',
    value: 250,
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Item Three',
    description: 'Third item in the demo dataset',
    value: 175,
    status: 'pending',
  },
  {
    id: 4,
    name: 'Item Four',
    description: 'Fourth item with additional information',
    value: 320,
    status: 'active',
  },
];
