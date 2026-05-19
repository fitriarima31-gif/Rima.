import { useState, useEffect, useMemo } from 'react';
import { RefreshCw, LayoutDashboard } from 'lucide-react';
import { cn, formatCurrency } from './lib/utils';
import { FinancialSummary } from './components/FinancialSummary';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { FinancialChart } from './components/FinancialChart';
import { type Transaction, type TransactionType, type Category } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('fintrack_transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    localStorage.setItem('fintrack_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const { balance, income, expenses } = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === 'income') {
          acc.income += t.amount;
          acc.balance += t.amount;
        } else {
          acc.expenses += t.amount;
          acc.balance -= t.amount;
        }
        return acc;
      },
      { balance: 0, income: 0, expenses: 0 }
    );
  }, [transactions]);

  const handleAddTransaction = (data: {
    type: TransactionType;
    amount: number;
    category: Category;
    description: string;
    date: string;
  }) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      ...data,
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to delete all data? This cannot be undone.')) {
      setTransactions([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">FinTrack.io</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Personal Asset Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:block text-right">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Total Balance</p>
              <p className="text-2xl font-bold text-blue-700 font-mono tracking-tight">{formatCurrency(balance)}</p>
            </div>
            <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-xs">
                JD
              </div>
              <button
                onClick={handleReset}
                className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                title="Reset Data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        <FinancialSummary balance={balance} income={income} expenses={expenses} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col gap-8">
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <FinancialChart transactions={transactions} />
          </div>

          <div className="lg:col-span-8">
            <TransactionList
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              filterDate={filterDate}
              onFilterChange={setFilterDate}
            />
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200 flex justify-between items-center text-slate-400 text-[10px] font-bold uppercase tracking-wider">
        <p>© 2026 FinTrack.io • Secure Local Storage Active</p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 anim-pulse"></span> 
            System Active
          </span>
          <span>v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
