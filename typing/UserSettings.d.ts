export type ThemeMode = 'auto' | 'light' | 'dark';

export interface NotificationSettings {
  dailyReminder: boolean;
  weeklyProgress: boolean;
  newModules: boolean;
  practiceTime: string;
}

export type QuestionCategory =
  | "Date"
  | "Time"
  | "Phone"
  | "Price"
  | "Measurement"
  | "Address"
  | "Quantity"
  | "Percentage";

export interface UserSettings {
  id?: string;   // 只有保存以后,才会拿到数据库ID
  themeMode: ThemeMode;
  currentLanguage: string;
  questionsPerSession: number;
  dailyGoal: number;
  notification: NotificationSettings;
  questionTypes: QuestionCategory[];
}