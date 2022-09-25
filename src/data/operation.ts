export interface Operation {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'spense' | 'income';
  category: string;
}
