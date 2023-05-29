import React from 'react';
import { PeopleOutline } from '@mui/icons-material';
import { AdminLayout } from '@/components/layouts';
import { Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IUser } from '@/interfaces';

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users');

  if (!data && !error) return <></>;

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre completo', width: 300 },
    { field: 'role', headerName: 'Rol', width: 300 },
  ];

  const rows = data!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title="Usuarios"
      subtitle="Mantenimientos de usuarios"
      icon={<PeopleOutline />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
