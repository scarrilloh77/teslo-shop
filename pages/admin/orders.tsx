import React from 'react';
import { AdminLayout } from '@/components/layouts';
import { ConfirmationNumberOutlined } from '@mui/icons-material';

const OrdersPage = () => {
  return (
    <AdminLayout
      title="Ordenes"
      subtitle="Mantenimiento de ordenes"
      icon={<ConfirmationNumberOutlined />}
    >
      Hola mundo
    </AdminLayout>
  );
};

export default OrdersPage;
