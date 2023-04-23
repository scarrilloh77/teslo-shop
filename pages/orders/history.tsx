import { ShopLayout } from '@/components/layouts';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import NextLink from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la ordern o no',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },
  {
    field: 'orden',
    headerName: 'Ver Orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: false, fullName: 'Alfonso Cantillo' },
  { id: 2, paid: true, fullName: 'Yuliedis Garcia' },
  { id: 3, paid: false, fullName: 'Laura Melina' },
  { id: 4, paid: true, fullName: 'Catalina Gomez' },
  { id: 5, paid: false, fullName: 'Stephania Thomas' },
  { id: 6, paid: true, fullName: 'Pedro Gonzales' },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de ordens"
      pageDescription="Historial de ordenes del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container>
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
    </ShopLayout>
  );
};

export default HistoryPage;
