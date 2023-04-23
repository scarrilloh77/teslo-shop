import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import {
  Typography,
  Grid,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
} from '@mui/material';
import NextLink from 'next/link';

const SummaryPage = () => {
  return (
    <ShopLayout title="Resumen de orden" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <CardContent>
            <Typography variant="h2">Resumen (3 productos)</Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <NextLink href="/checkout/address" passHref legacyBehavior>
                <Link underline="always">Editar</Link>
              </NextLink>
            </Box>
            <Typography>Sebastian Carrillo</Typography>
            <Typography>Calle 42 #23C-15</Typography>
            <Typography>Barranquilla</Typography>
            <Typography>Colombia</Typography>
            <Typography>+57 3209104958</Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="end">
              <NextLink href="/cart" passHref legacyBehavior>
                <Link underline="always">Editar</Link>
              </NextLink>
            </Box>
            <OrderSummary />
            <Box sx={{ mt: 3 }}>
              <Button color="secondary" className="circular-btn" fullWidth>
                Confirmar Orden
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
