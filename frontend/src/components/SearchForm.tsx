'use client';

import { useState } from 'react';
import { Search, Settings } from 'lucide-react';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

export interface SearchParams {
  token: string;
  preset: string;
  amount: number;
  consider: number;
}

const presets = [
  { value: 'worldwide', label: 'Worldwide' },
  { value: 'united states', label: 'United States' },
  { value: 'germany', label: 'Germany' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'france', label: 'France' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'japan', label: 'Japan' },
  { value: 'india', label: 'India' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'sweden', label: 'Sweden' },
  { value: 'norway', label: 'Norway' },
  { value: 'finland', label: 'Finland' },
  { value: 'denmark', label: 'Denmark' },
];

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [token, setToken] = useState('');
  const [preset, setPreset] = useState('worldwide');
  const [amount, setAmount] = useState(50);
  const [consider, setConsider] = useState(1000);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      alert('Please enter a GitHub token');
      return;
    }
    onSearch({ token, preset, amount, consider });
  };

  return (
    <div className="card-brutal-primary mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-8 h-8 text-dark-900" />
        <h2 className="text-2xl font-bold text-dark-900 uppercase tracking-wide">
          Search GitHub Contributors
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="token" className="block text-sm font-bold text-dark-900 mb-2 uppercase tracking-wide">
            GitHub Token *
          </label>
          <input
            type="password"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="input-brutal w-full bg-dark-50 text-dark-900 placeholder-dark-500 border-dark-800"
            required
          />
          <p className="text-xs text-dark-700 mt-1">
            Create a token at{' '}
            <a 
              href="https://github.com/settings/tokens" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-dark-900"
            >
              github.com/settings/tokens
            </a>
          </p>
        </div>

        <div>
          <label htmlFor="preset" className="block text-sm font-bold text-dark-900 mb-2 uppercase tracking-wide">
            Location Preset
          </label>
          <select
            id="preset"
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            className="select-brutal w-full bg-dark-50 text-dark-900 border-dark-800"
          >
            {presets.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-dark-800 hover:text-dark-900 font-medium mb-3"
          >
            <Settings className="w-4 h-4" />
            Advanced Options
          </button>
          
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-dark-800 border-2 border-dark-700">
              <div>
                <label htmlFor="amount" className="block text-sm font-bold text-dark-50 mb-2 uppercase tracking-wide">
                  Results to Show
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 50)}
                  min="1"
                  max="1000"
                  className="input-brutal w-full"
                />
              </div>
              
              <div>
                <label htmlFor="consider" className="block text-sm font-bold text-dark-50 mb-2 uppercase tracking-wide">
                  Users to Consider
                </label>
                <input
                  type="number"
                  id="consider"
                  value={consider}
                  onChange={(e) => setConsider(parseInt(e.target.value) || 1000)}
                  min="100"
                  max="10000"
                  className="input-brutal w-full"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn-brutal-accent w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Searching...' : 'Search Contributors'}
        </button>
      </form>
    </div>
  );
}