export interface RawFormResponse {
  timestamp: string;
  email: string;
  teamName: string;
  saved: number;
  baptisms: number;
  guests: number;
  evidenceUrls: string[];
  teamMembersRaw: string;
}

export interface RawTeamCatalogItem {
  timestamp: string;
  teamName: string;
  member1: string;
  member2: string;
}

export interface TeamMember {
  name: string;
  role?: string;
}

export interface EvidenceItem {
  url: string;
  thumbnailUrl: string;
  driveFileId?: string;
  timestamp: string;
  reportedBy: string;
  teamName: string;
}

export interface TeamMetrics {
  rank: number;
  teamName: string;
  members: string[];
  saved: number;
  baptisms: number;
  guests: number;
  totalScore: number;
  savedPercentage: number;
  evidenceCount: number;
  latestReportDate: string;
  evidences: EvidenceItem[];
}

export interface GlobalKPIs {
  totalSaved: number;
  totalBaptisms: number;
  totalGuests: number;
  totalReports: number;
  activeTeamsCount: number;
  targetSaved: number;
  savedProgressPct: number;
  leaderTeam: TeamMetrics | null;
}

export interface DashboardData {
  kpis: GlobalKPIs;
  teams: TeamMetrics[];
  top3: TeamMetrics[];
  lastUpdated: string;
  dataSource: 'google_sheets' | 'mock_data';
  syncStatusMessage?: string;
}
