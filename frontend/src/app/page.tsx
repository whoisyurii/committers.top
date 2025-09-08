'use client';

import { useState } from 'react';
import { GitHubSearchResults, ApiError } from '@/types/github';
import SearchForm, { SearchParams } from '@/components/SearchForm';
import UserCard from '@/components/UserCard';
import { Github, TrendingUp, Users, AlertCircle } from 'lucide-react';

export default function Home() {
  const [results, setResults] = useState<GitHubSearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const queryParams = new URLSearchParams({
        token: params.token,
        preset: params.preset,
        amount: params.amount.toString(),
        consider: params.consider.toString(),
      });

      const response = await fetch(`http://localhost:8080/api/github-users?${queryParams}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data: GitHubSearchResults = await response.json();
      setResults(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="bg-primary-600 border-b-4 border-dark-800 shadow-brutal-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="bg-dark-900 p-3 border-3 border-dark-800 shadow-brutal">
              <Github className="w-8 h-8 text-primary-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-dark-900 uppercase tracking-wide">
                GitHub Contributors
              </h1>
              <p className="text-dark-800 font-medium">
                Discover the most active developers worldwide
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* Error State */}
        {error && (
          <div className="card-brutal bg-red-900 border-red-700 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="font-bold text-red-200 mb-1">Error</h3>
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="card-brutal text-center py-12">
            <div className="animate-pulse-slow">
              <TrendingUp className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary-300 mb-2">Searching...</h3>
              <p className="text-dark-400">Fetching GitHub contributor data</p>
            </div>
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card-brutal-primary text-center">
                <Users className="w-8 h-8 text-dark-900 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-900">{results.Users.length}</div>
                <div className="text-dark-800 font-medium uppercase tracking-wide">Results</div>
              </div>
              
              <div className="card-brutal text-center">
                <TrendingUp className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-300">{results.TotalUserCount.toLocaleString()}</div>
                <div className="text-dark-400 font-medium uppercase tracking-wide">Total Users</div>
              </div>
              
              <div className="card-brutal text-center">
                <Github className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-secondary-300">{results.MinimumFollowerCount}</div>
                <div className="text-dark-400 font-medium uppercase tracking-wide">Min Followers</div>
              </div>
            </div>

            {/* User List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary-300 uppercase tracking-wide border-b-3 border-primary-600 pb-2">
                Top Contributors
              </h2>
              
              {results.Users.map((user, index) => (
                <UserCard key={user.Login} user={user} rank={index + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!results && !loading && !error && (
          <div className="card-brutal text-center py-12">
            <Github className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark-400 mb-2">Ready to Search</h3>
            <p className="text-dark-500">Enter your GitHub token and select a location to get started</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-dark-800 border-t-4 border-dark-700 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-dark-400">
            Built with Go, Next.js, and Neobrutalism design
          </p>
        </div>
      </footer>
    </div>
  );
}