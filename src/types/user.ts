export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  sessions: string[];
  registrationDate: Date;
  lastLoginDate: Date | null;
  isBlocked: boolean;
}
