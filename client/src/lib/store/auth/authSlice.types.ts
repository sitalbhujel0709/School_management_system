export interface User {
  id: string;
  email: string;
  subscription?: {  
    isActive: boolean;
    status: string | null;
    plan: string | null;
    endDate: Date | null;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
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