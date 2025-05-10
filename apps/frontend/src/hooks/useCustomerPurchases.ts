import { useQueryWithFetcher } from '@/hooks/useQueryWithFetcher';

export interface CustomerPurchase {
  date: string;
  quantity: number;
  product: string;
  price: number;
  imgSrc: string;
}

/**
 * 고객 구매 내역 조회
 */
export const useCustomerPurchases = (customerId: number) => {
  const url = `/api/customers/${customerId}/purchases`;

  return useQueryWithFetcher<CustomerPurchase[]>(
    ['customer-purchases', customerId],
    url,
    {
      enabled: !!customerId && Number(customerId) > 0,
      fetcherOptions: { returnEmptyOn404: true },
      select: data => Array.isArray(data) ? data : [], 
    }
  );
};