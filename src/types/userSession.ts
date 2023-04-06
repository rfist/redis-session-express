export interface UserSession {
  deviceIds: string[];
  lastActivity: number;
  blocked: boolean;
  blockedUntil?: number;
}
