import { fetchWithHandling } from '@/utils/fetchWithHandling';
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

/**
 * useQuery를 사용하여 데이터 페칭 + 에러 핸들링을 포함한 커스텀 훅 
 */
export function useQueryWithFetcher<
  TData = unknown,
  TResult = TData
>(
  key: QueryKey,
  url: string,
  options?: Omit<UseQueryOptions<TData, Error, TResult, QueryKey>, 'queryKey' | 'queryFn'> & {
    fetcherOptions?: { returnEmptyOn404?: boolean }
  }
) {
  const { fetcherOptions, ...queryOptions } = options ?? {};

  return useQuery<TData, Error, TResult>({
    queryKey: key,
    queryFn: () => fetchWithHandling<TData>(url, undefined, fetcherOptions),
    ...queryOptions,
  });
}