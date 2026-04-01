import React, { useState } from 'react';
import { DollarSign, Plus, Trash2, PieChart, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BudgetTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Grand Ballroom Venue', category: 'Venue', amount: 2500, status: 'Paid' },
    { id: 2, name: 'Premium Catering (100 pax)', category: 'Food', amount: 1800, status: 'Pending' },
    { id: 3, name: 'DJ & Sound System', category: 'Entertainment', amount: 600, status: 'Paid' },
  ]);

  const totalBudget = 6000;
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><DollarSign size={24} /></div>
            <div>
              <p className="text-sm text-slate-500">Total Spent</p>
              <h3 className="text-2xl font-bold text-slate-900">${totalSpent}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><TrendingUp size={24} /></div>
            <div>
              <p className="text-sm text-slate-500">Remaining Budget</p>
              <h3 className="text-2xl font-bold text-slate-900">${remaining}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-lg text-orange-600"><PieChart size={24} /></div>
            <div>
              <p className="text-sm text-slate-500">Budget Usage</p>
              <h3 className="text-2xl font-bold text-slate-900">{Math.round((totalSpent / totalBudget) * 100)}%</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Expense Breakdown</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus size={18} /> Add Expense
          </button>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold">Expense Name</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                <td className="px-6 py-4 text-slate-600">{item.category}</td>
                <td className="px-6 py-4 font-bold text-slate-900">${item.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}