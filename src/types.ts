export type AppStep =
  | 'asking'
  | 'yesCelebration'
  | 'dateSelection'
  | 'activitySelection'
  | 'preferences'
  | 'specialQuestion'
  | 'smileScreen'
  | 'summary'
  | 'confirmed';

export interface DatePlan {
  date: string | null; // ISO string to easily serialize in localStorage
  activities: string[];
  preferences: string[];
  customPreference: string;
  special: string;
}

export const INITIAL_PLAN: DatePlan = {
  date: null,
  activities: [],
  preferences: [],
  customPreference: '',
  special: '',
};
