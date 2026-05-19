import React, { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { CATEGORIES, type Category, type TransactionType } from '@/src/types';

interface FormProps {
  onAddTransaction: (transaction: {
    type: TransactionType;
    amount: number;
    category: Category;
    description: string;
    date: string;
  }) => void;
}

export function TransactionForm({ onAddTransaction }: FormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Other');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    });

    setAmount('');
    setDescription('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
        Add Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Transaction Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['income', 'expense'] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`py-2 px-4 rounded-xl font-bold text-sm transition-all border ${
                  type === t
                    ? t === 'income' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-slate-50 text-slate-500 border-slate-100'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-lg font-bold outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium outline-none appearance-none cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium outline-none cursor-pointer"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium h-24 resize-none outline-none focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold mt-2 shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-[0.98]"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
}
