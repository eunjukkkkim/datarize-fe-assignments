import { useQueryWithFetcher } from '@/hooks/useQueryWithFetcher';
import { urlWithParams } from '@/utils/urlWithParams';

export interface Customer {
  id: number;
  name: string;
  count: number;
  totalAmount: number;
}

export interface UseCustomersParams {
  name?: string;
  sortBy?: 'asc' | 'desc';
}
/**
 * 고객 목록 조회 
 */
export const useCustomers = (params: UseCustomersParams = {}) => {
  const url = urlWithParams('/api/customers', {
    ...params
  });

  return useQueryWithFetcher<Customer[]>(['customers', params], url, {
    fetcherOptions: { returnEmptyOn404: true },
    select: (data) => Array.isArray(data) ? data : [], 
  });
};