import type { Dayjs } from 'dayjs';
import { useQueryWithFetcher } from '@/hooks/useQueryWithFetcher';
import { urlWithParams } from '@/utils/urlWithParams';

export interface PurchaseFrequencyRaw {
  range: string;
  count: number;
}

export interface PurchaseFrequencyChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export interface usePurchaseFrequencyProps {
  dateRange?: [Dayjs | null, Dayjs | null] | null;
}

/**
 * 구매 빈도 차트 데이터 조회
 */
export const usePurchaseFrequency = ({ dateRange }: usePurchaseFrequencyProps) => {
  const [from, to] = dateRange || [null, null];

  const url = urlWithParams('/api/purchase-frequency', {
    from: from?.toISOString(),
    to: to?.toISOString(),
  });

  return useQueryWithFetcher<PurchaseFrequencyRaw[], PurchaseFrequencyChartData>(
    ['purchase-frequency', from?.toISOString(), to?.toISOString()],
    url,
    {
      select: (rawData) => ({
        labels: rawData.map(item => item.range),
        datasets: [
          {
            label: '구매 건수',
            data: rawData.map(item => item.count),
            backgroundColor: 'rgba(24, 144, 255, 0.5)',
          },
        ],
      }),
    }
  );
};