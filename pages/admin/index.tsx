import React from 'react';
import { DashboardOutlined } from '@mui/icons-material';
import { AdminLayout } from '@/components/layouts';

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Estadisticas generales "
      icon={<DashboardOutlined />}
    >
      Hola mundo!
    </AdminLayout>
  );
};

export default DashboardPage;
