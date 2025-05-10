import React from 'react';
import { Table, Input, Button, Card, Empty } from 'antd';
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ColumnType } from 'antd/es/table';
import { useCustomers, type Customer } from '@/hooks/useCustomers';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import StatusDisplay from '@/components/common/StatusDisplay';

/**
 * 고객 목록 테이블 컴포넌트
 */
const CustomerTable = React.memo(() => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | undefined>(undefined);
  const [filterValue, setFilterValue] = useState<string>('');

  const handleTableChange = useCallback(
    (
      _: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<Customer> | SorterResult<Customer>[]
    ) => {
      const newName = filters.name && filters.name[0] ? String(filters.name[0]).trim() : '';
      if (newName !== name) {
        setName(newName);
      }
      const newSortBy = !Array.isArray(sorter) && 'field' in sorter && sorter.field
        ? sorter.order === 'ascend' ? 'asc' : 'desc'
        : undefined;
      if (newSortBy !== sortBy) {
        setSortBy(newSortBy);
      }
    },
    [name, sortBy]
  );

  const handleSearch = () => {
    setName(filterValue);
  };

  const handleReset = () => {
    setFilterValue('');
    setName('');
  };

  const customerColumns = useMemo<ColumnType<Customer>[]>(() => [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
    { title: '이름', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '구매 횟수', dataIndex: 'count', key: 'count', align: 'center' },
    {
      title: '총 구매 금액',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'center',
      sorter: true,
      render: (value: number) => `${value?.toLocaleString()}원`,
    },
  ], []);

  const { data: customers, isLoading, error } = useCustomers({ name, sortBy });

  return (
    <Card title="고객 목록" style={{ marginTop: 12 }}>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="이름 검색"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value.trim())}
          onPressEnter={handleSearch}
          style={{ width: 200, marginRight: 8 }}
          allowClear
          onClear={handleReset}
        />
        <Button type="primary" onClick={handleSearch} style={{ marginRight: 8 }}>
          검색
        </Button>
      </div>
      <StatusDisplay isLoading={isLoading} error={error}> 
        <Table
          dataSource={customers}
          columns={customerColumns}
          rowKey="id"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="검색결과가 없습니다."
              />
            ),
          }}
          pagination={false}
          onChange={handleTableChange}
          onRow={(record) => ({
            onClick: () => navigate(`/detail/${record.id}`),
            style: { cursor: 'pointer' },
          })}
        />
      </StatusDisplay>
    </Card>
  );
});

export default CustomerTable; 