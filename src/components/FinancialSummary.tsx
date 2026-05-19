import { motion } from 'motion/react';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import { cn, formatCurrency } from '@/src/lib/utils';

interface SummaryProps {
  balance: number;
  income: number;
  expenses: number;
}

export function FinancialSummary({ balance, income, expenses }: SummaryProps) {
  const cards = [
    {
      title: 'Monthly Income',
      amount: income,
      icon: ArrowUpRight,
      bg: 'bg-emerald-500',
      text: 'text-emerald-100',
      percentage: '+12% from last month',
    },
    {
      title: 'Monthly Expense',
      amount: expenses,
      icon: ArrowDownLeft,
      bg: 'bg-rose-500',
      text: 'text-rose-100',
      percentage: '8% less than last month',
    },
    {
      title: 'Savings Goal',
      amount: balance,
      icon: Wallet,
      bg: 'bg-blue-900',
      text: 'text-blue-200',
      percentage: 'Target: $10,000.00',
      progress: Math.min((balance / 10000) * 100, 100),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "relative overflow-hidden p-6 rounded-2xl shadow-md",
            card.bg,
            "text-white"
          )}
        >
          <p className={cn("text-[10px] font-bold uppercase tracking-wider mb-2", card.text)}>
            {card.title}
          </p>
          <div className="flex items-baseline gap-1">
            <h2 className="text-3xl font-bold font-mono tracking-tight">
              {formatCurrency(card.amount)}
            </h2>
          </div>
          
          {card.progress !== undefined ? (
            <div className="mt-4">
              <div className="w-full bg-blue-800 h-1.5 rounded-full">
                <div 
                  className="bg-blue-400 h-1.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${card.progress}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] font-medium text-white/60">
                {card.progress.toFixed(0)}% of goal reached
              </p>
            </div>
          ) : (
            <p className={cn("mt-4 text-[10px] font-medium opacity-80", card.text)}>
              {card.percentage}
            </p>
          )}

          <card.icon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 rotate-12" />
        </motion.div>
      ))}
    </div>
  );
}
