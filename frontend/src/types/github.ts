export interface GitHubUser {
  Login: string;
  AvatarURL: string;
  Name: string;
  Company: string;
  Organizations: string[];
  FollowerCount: number;
  ContributionCount: number;
  PublicContributionCount: number;
  PrivateContributionCount: number;
  CommitsCount: number;
  PullRequestsCount: number;
}

export interface GitHubSearchResults {
  Users: GitHubUser[];
  MinimumFollowerCount: number;
  TotalUserCount: number;
}

export interface ApiError {
  message: string;
  status: number;
}