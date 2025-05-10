export class APIError extends Error {
  constructor(
    public status: number,
    public response?: Response,
    message?: string
  ) {
    super(message || `HTTP ${status}`);
    this.name = 'APIError';
  }
}

interface FetchOptions {
  returnEmptyOn404?: boolean;
}

/** 
 * 에러 처리 및 데이터 반환 처리 유틸 함수
 */
export async function fetchWithHandling<T>(
  url: string,
  init?: RequestInit,
  options?: FetchOptions
): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    if (options?.returnEmptyOn404 && response.status === 404) {
      return [] as T;
    }

    throw new APIError(response.status, response, response.statusText);
  }

  return response.json();
}