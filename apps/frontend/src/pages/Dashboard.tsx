import CustomerTable from '@/components/dashboard/CustomerTable';
import { PurchaseFrequencyChart } from '@/components/dashboard/PurchaseFrequencyChart';

const Dashboard = () => {
  return (
    <div style={{ padding: '24px' }}>
      <PurchaseFrequencyChart />
      <CustomerTable />
    </div>
  );
};

export default Dashboard;