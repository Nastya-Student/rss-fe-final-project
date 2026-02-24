export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  xp: number;
  streak: number;
  createdAt: string;
}
