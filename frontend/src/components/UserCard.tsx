import { GitHubUser } from '@/types/github';
import { Users, GitCommit, GitPullRequest, Building2 } from 'lucide-react';
import Image from 'next/image';

interface UserCardProps {
  user: GitHubUser;
  rank: number;
}

export default function UserCard({ user, rank }: UserCardProps) {
  return (
    <div className="card-brutal hover:shadow-brutal-xl hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-3 border-dark-800 shadow-brutal overflow-hidden">
            <Image
              src={user.AvatarURL}
              alt={`${user.Login}'s avatar`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-2 -left-2 bg-accent-400 text-dark-900 font-bold text-sm px-2 py-1 border-2 border-dark-800 shadow-brutal">
            #{rank}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-primary-300 truncate">
              {user.Name || user.Login}
            </h3>
            {user.Name && (
              <span className="text-dark-400 font-mono text-sm">@{user.Login}</span>
            )}
          </div>
          
          {user.Company && (
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-secondary-400" />
              <span className="text-dark-300 text-sm">{user.Company}</span>
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div className="bg-primary-800 border-2 border-primary-600 p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <GitCommit className="w-4 h-4 text-primary-300" />
              </div>
              <div className="text-lg font-bold text-primary-200">{user.ContributionCount.toLocaleString()}</div>
              <div className="text-xs text-primary-400 uppercase tracking-wide">Total</div>
            </div>
            
            <div className="bg-secondary-800 border-2 border-secondary-600 p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <GitCommit className="w-4 h-4 text-secondary-300" />
              </div>
              <div className="text-lg font-bold text-secondary-200">{user.CommitsCount.toLocaleString()}</div>
              <div className="text-xs text-secondary-400 uppercase tracking-wide">Commits</div>
            </div>
            
            <div className="bg-accent-800 border-2 border-accent-600 p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <GitPullRequest className="w-4 h-4 text-accent-300" />
              </div>
              <div className="text-lg font-bold text-accent-200">{user.PullRequestsCount.toLocaleString()}</div>
              <div className="text-xs text-accent-400 uppercase tracking-wide">PRs</div>
            </div>
            
            <div className="bg-dark-700 border-2 border-dark-600 p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-4 h-4 text-dark-300" />
              </div>
              <div className="text-lg font-bold text-dark-200">{user.FollowerCount.toLocaleString()}</div>
              <div className="text-xs text-dark-400 uppercase tracking-wide">Followers</div>
            </div>
          </div>
          
          {user.Organizations && user.Organizations.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-dark-400 uppercase tracking-wide mb-1">Organizations</div>
              <div className="flex flex-wrap gap-1">
                {user.Organizations.slice(0, 3).map((org, index) => (
                  <span
                    key={index}
                    className="bg-dark-700 text-dark-200 px-2 py-1 text-xs border border-dark-600 font-mono"
                  >
                    {org}
                  </span>
                ))}
                {user.Organizations.length > 3 && (
                  <span className="text-dark-400 text-xs">+{user.Organizations.length - 3} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}