export interface Tenant {
  id: string;
  tenantCode: string;
  tenantOwner: string;
  tenantDetails?: Record<string, number>;
}

export interface TenantState {
  tenant: Tenant | null;
  isLoading: boolean;
  error: string | null;
  
}