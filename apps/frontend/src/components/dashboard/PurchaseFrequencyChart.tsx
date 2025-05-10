import { DatePicker, Card } from 'antd';
import { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import type { Dayjs } from 'dayjs';
import { usePurchaseFrequency } from '@/hooks/usePurchaseFrequency';
import StatusDisplay from '@/components/common/StatusDisplay';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { RangePicker } = DatePicker;

/**
 * 구매 빈도 차트 컴포넌트
 */ 
export const PurchaseFrequencyChart = () => {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const { data, isLoading, error } = usePurchaseFrequency({ dateRange });

  const hasData = data?.datasets.some(dataset => dataset.data.some(count => count > 0)) || false;

  const maxYValue = useMemo(() => {
    if (!data || data.datasets.length === 0) return undefined;
    const maxDataValue = Math.max(...data.datasets[0].data);
    return Math.ceil((maxDataValue + 5) / 5) * 5;
  }, [data]);

  const options: ChartOptions<'bar'> = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        align: 'end',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '금액 범위 (원)',
          font: {
            size: 12,
          },
          padding: { top: 10, bottom: 0 }, // x축 제목에 패딩 추가
        },
      },
      y: {
        title: {
          display: true,
          text: '구매 건수 (건)',
          font: {
            size: 12,
          },
          padding: { top: 0, bottom: 10 }, // y축 제목에 패딩 추가
        },
        beginAtZero: true,
        max: maxYValue,
        ticks: {
          stepSize: 5,
        },
      },
    },
  }), [maxYValue]);

  return (
    <Card title="구매 빈도 차트" 
        extra={<RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
        />}
        style={{ marginTop: 32 }}>
      <StatusDisplay isLoading={isLoading} error={error as Error | null} hasData={hasData}>
        <Bar data={data || { datasets: [], labels: [] }} options={options} />
      </StatusDisplay>
    </Card>
  );
};

export default StatusDisplay;