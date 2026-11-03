export interface User {
  id: string;
  email: string;
  username: string;
  subscription?: {  
    isActive: boolean;
    status: string | null;
    plan: string | null;
    endDate: Date | null;
  };
  tenant?: {
    tenantCode: string | null;
  }
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isUserInitialized: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}