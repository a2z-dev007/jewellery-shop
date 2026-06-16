import { AsyncLocalStorage } from 'async_hooks';

export interface TenantContext {
  storeId: string;
}

export const tenantLocalStorage = new AsyncLocalStorage<TenantContext>();

export const getStoreId = (): string | undefined => {
  return tenantLocalStorage.getStore()?.storeId;
};
