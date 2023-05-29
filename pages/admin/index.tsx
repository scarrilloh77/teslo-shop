import React, { useEffect, useState } from 'react';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { AdminLayout } from '@/components/layouts';
import { Grid, Typography } from '@mui/material';
import { SummaryTile } from '@/components/admin';
import useSWR from 'swr';
import { DashboardSummaryResponse } from '@/interfaces';

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 30 * 1000, // 30 seconds
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000); // This function will be called every 1 second even if the component is unmounted!!! FOR THAT REASON WE NEED TO RETURN A FUNCTION TO CLEAR THE INTERVAL!!!

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!data && !error) return <></>;

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Estadisticas generales "
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle="Ordenes totales"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={paidOrders}
          subTitle="Ordenes pagadas"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={notPaidOrders}
          subTitle="Ordenes pendientes"
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfClients}
          subTitle="Clientes"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={numberOfProducts}
          subTitle="Productos"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={productsWithNoInventory}
          subTitle="Sin existencias"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />
        <SummaryTile
          title={lowInventory}
          subTitle="Bajo inventario"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />
        <SummaryTile
          title={refreshIn}
          subTitle="Actualización en:"
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
