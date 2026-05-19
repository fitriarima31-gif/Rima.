export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Food' 
  | 'Transport' 
  | 'Shopping' 
  | 'Entertainment' 
  | 'Health' 
  | 'Salary' 
  | 'Investment' 
  | 'Other';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string;
}

export const CATEGORIES: Category[] = [
  'Food', 
  'Transport', 
  'Shopping', 
  'Entertainment', 
  'Health', 
  'Salary', 
  'Investment', 
  'Other'
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#F87171',
  Transport: '#60A5FA',
  Shopping: '#FBBF24',
  Entertainment: '#A78BFA',
  Health: '#34D399',
  Salary: '#10B981',
  Investment: '#818CF8',
  Other: '#9CA3AF'
};
