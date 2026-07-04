export type ContentType =
  | 'liveLesson'
  | 'culturalVideo'
  | 'historicalExperience'
  | 'event'
  | 'challenge';

export type Platform =
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'twitch'
  | 'zoom'
  | 'custom';

export type AgeGroup = 'kids' | 'adults' | 'all';
export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface Teacher {
  name: string;
  avatar: string;
  bio: string;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  teacher: Teacher;
  platform: Platform;
  streamUrl: string;
  thumbnail: string;
  isLive: boolean;
  viewerCount: number;
  scheduledStart: string;
  language: string;
  ageGroup: AgeGroup;
  topic: string;
  level: Level;
  tags: string[];
  duration?: number;
}

export type PartnerCategory =
  | 'Official English Centers'
  | 'IELTS Preparation Centers'
  | 'Independent English Teachers'
  | 'Kids English Learning'
  | 'School Curriculum Support'
  | 'Speaking & Conversation'
  | 'Online Live Lessons';

export type CredibilityLabel =
  | 'Official Center'
  | 'Verified Teacher'
  | 'IELTS Trainer'
  | 'Curriculum Support'
  | 'Premium Partner';

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  specialization: string;
  description: string;
  logo: string;
  officialLink: string;
  instagram?: string;
  youtube?: string;
  phone?: string;
  email?: string;
  credibilityLabel: CredibilityLabel;
  isLive: boolean;
  upcomingSessions: {
    title: string;
    date: string;
    time: string;
  }[];
  verified: boolean;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  lat: number;
  lon: number;
  region: string;
  timezone: string;
  content: ContentItem[];
  partners?: Partner[];
  partnerCategories?: PartnerCategory[];
}

export type FilterType = 'all' | ContentType;

export type ContinueLearningOption =
  | 'exercises'
  | 'vocabulary'
  | 'chapters'
  | 'games'
  | 'lateefa'
  | 'stories';
