import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import { CartContext } from '@/context';
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>; // Evitar renderizar cualquier cosa en el cliente.
  }

  return (
    <ShopLayout
      title="Carrito - 3"
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <CardContent>
            <Typography variant="h2">Orden</Typography>
            <Divider sx={{ my: 1 }} />
            <OrderSummary />
            <Box sx={{ mt: 3 }}>
              <Button color="secondary" className="circular-btn" fullWidth>
                Checkout
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;

// SSR Solo se hace en caso de ser estrictamente necesario. Hay que tener en mente tratar de que el server trabaje lo menos posible.
