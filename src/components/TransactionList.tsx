import { Trash2, Calendar, Filter } from 'lucide-react';
import { formatCurrency, cn } from '@/src/lib/utils';
import { type Transaction } from '@/src/types';
import { format, parseISO } from 'date-fns';

interface ListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  filterDate: string;
  onFilterChange: (date: string) => void;
}

export function TransactionList({ transactions, onDelete, filterDate, onFilterChange }: ListProps) {
  const filtered = transactions.filter(t => !filterDate || t.date === filterDate);

  const getEmoji = (category: string) => {
    switch (category) {
      case 'Food': return '☕';
      case 'Transport': return '🚗';
      case 'Shopping': return '🛍️';
      case 'Entertainment': return '🎬';
      case 'Health': return '🏥';
      case 'Salary': return '💰';
      case 'Investment': return '📈';
      default: return '📄';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="w-1.5 h-5 bg-slate-900 rounded-full"></span>
          History
        </h2>
        
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <input 
            type="date" 
            value={filterDate}
            onChange={(e) => onFilterChange(e.target.value)}
            className="bg-transparent text-[10px] font-bold uppercase tracking-wider outline-none text-slate-500 cursor-pointer"
          />
          {filterDate && (
            <button 
              onClick={() => onFilterChange('')}
              className="text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:underline px-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[600px] scrollbar-hide">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <p className="text-sm font-medium">No transactions found</p>
          </div>
        ) : (
          filtered.map((t) => (
            <div 
              key={t.id} 
              className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm text-xl">
                  {getEmoji(t.category)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.description}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {format(parseISO(t.date), 'MMM dd, yyyy')} • {t.category}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <p className={cn(
                  "text-sm font-bold tabular-nums",
                  t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                )}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount).replace('$', '')}
                </p>
                <button
                  onClick={() => onDelete(t.id)}
                  className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {!filterDate && transactions.length > 5 && (
        <div className="mt-auto p-4 border-t border-slate-100 text-center">
          <button className="text-blue-600 text-[10px] font-bold uppercase tracking-wider hover:underline">
            View All Transactions
          </button>
        </div>
      )}
    </div>
  );
}
