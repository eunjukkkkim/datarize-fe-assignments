import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Table, Image, Empty } from 'antd';
import { useCustomerPurchases, type CustomerPurchase } from '@/hooks/useCustomerPurchases';
import type { ColumnType } from 'antd/es/table';
import StatusDisplay from '@/components/common/StatusDisplay'; 

const purchaseColumns: ColumnType<CustomerPurchase>[] = [
  {
    title: '상품 이미지',
    dataIndex: 'imgSrc',
    key: 'imgSrc',
    align: 'center',
    render: (imgSrc: string) => (
      <Image 
        src={imgSrc} 
        alt="상품 이미지" 
        width={100} 
        height={100}
        style={{ objectFit: 'cover' }}
      />
    ),
  },
  {
    title: '상품명',
    dataIndex: 'product',
    key: 'product',
    align: 'center',
  },
  {
    title: '구매 일자',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
  },
  {
    title: '상품 금액',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    render: (price: number) => `${price.toLocaleString()}원`,
  },
  {
    title: '수량',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
  },
  {
    title: '총 금액',
    key: 'totalPrice',
    align: 'center',
    render: (_: any, record: CustomerPurchase) => `${(record.price * record.quantity).toLocaleString()}원`,
  },
];

const CustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: purchases, isLoading, error } = useCustomerPurchases(Number(id));

  return (
    <div style={{ padding: '24px' }}>
        <Card title="고객 구매 내역" extra={<Button onClick={() => navigate('/')}>
          돌아가기
        </Button>}>
        <StatusDisplay isLoading={isLoading} error={error}>
          <Table
            dataSource={purchases}
            columns={purchaseColumns}
            rowKey={(record) => `${record.date}-${record.product}`}
            pagination={false}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="검색결과가 없습니다."
                />
              ),
            }}
          />
        </StatusDisplay>
      </Card>
    </div>
  );
};

export default CustomerDetail;