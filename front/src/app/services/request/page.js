'use client';

import { useState } from 'react';
import {
  Send,
  ArrowRight,
  MapPin,
  Coins,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

const categoryPoints = {
  'Healthcare': 50,
  'Home Repairs': 30,
  'Technology': 45,
  'Construction': 35,
  'Barber': 15,
  'Tailor': 20,
  'Mechanic': 30,
  'Transport': 20,
  'Education': 25,
};

const categories = [
  'Healthcare', 'Home Repairs', 'Technology', 'Construction',
  'Barber', 'Tailor', 'Mechanic', 'Transport', 'Education'
];

export default function RequestServicePage() {
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    points: 20,
    location: '',
    urgency: 'normal',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('🎉 Your request has been posted! Community members will reach out soon.');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="container-custom max-w-2xl">
        <div className="text-center mb-8">
          <span className="section-label">Request Help</span>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-2 mb-2">
            Need <span className="text-emerald-600">Help?</span>
          </h1>
          <p className="text-gray-500 text-sm">Post a request and let the community help you.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-5">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">What do you need?*</label>
            <input
              type="text"
              placeholder="e.g., Need a plumber for kitchen sink"
              className="input-field"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Category*</label>
            <select
              className="input-field cursor-pointer"
              value={form.category}
              onChange={(e) => {
                const cat = e.target.value;
                setForm({ ...form, category: cat, points: categoryPoints[cat] ?? 20 });
              }}
              required
            >
              <option value="">Select category...</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Describe your need*</label>
            <textarea
              rows={4}
              placeholder="Describe in detail what you need help with..."
              className="input-field resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Points you'll pay</label>
            {form.category === 'Other' ? (
              <>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={form.points}
                    onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
                    className="flex-1 accent-emerald-500"
                  />
                  <div className="points-badge text-base" style={{ padding: '6px 16px' }}>
                    <Coins className="w-4 h-4" /> {form.points} pts
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">Set a fair point value for your custom request.</p>
              </>
            ) : (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[13px] text-emerald-700 font-semibold">
                  {form.category ? `Based on ${form.category} market rate` : 'Select a category first'}
                </span>
                <div className="points-badge text-base" style={{ padding: '6px 16px' }}>
                  <Coins className="w-4 h-4" /> {form.points} pts
                </div>
              </div>
            )}
            <p className="text-[11px] text-gray-400 mt-1">Your current balance: <strong>250 pts</strong></p>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Location*</label>
            <input
              type="text"
              placeholder="Your location in Gaza"
              className="input-field"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Urgency</label>
            <div className="flex gap-2">
              {[
                { value: 'low', label: 'Low', color: 'text-blue-600 bg-blue-50 border-blue-200' },
                { value: 'normal', label: 'Normal', color: 'text-amber-600 bg-amber-50 border-amber-200' },
                { value: 'urgent', label: 'Urgent', color: 'text-red-600 bg-red-50 border-red-200' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, urgency: opt.value })}
                  className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-all ${
                    form.urgency === opt.value ? opt.color : 'bg-gray-50 border-gray-200 text-gray-500'
                  }`}
                >
                  {opt.value === 'urgent' && <AlertCircle className="w-4 h-4 inline mr-1" />}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary w-full text-base flex items-center justify-center gap-2" style={{ padding: '14px 28px' }}>
            <Send className="w-4 h-4" /> Post Request
          </button>
        </form>
      </div>
    </div>
  );
}
