/**
 * 객체를 URLSearchParams로 변환하여 쿼리스트링 포함 URL 생성
 */
export const urlWithParams = (
  baseUrl: string,
  params?: Record<string, string | number | boolean | null | undefined>
): string => {
  if (!params) return baseUrl;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}