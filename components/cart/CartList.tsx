import { useContext } from 'react';
import NextLink from 'next/link';
import {
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { CartContext } from '@/context';
import { ItemCounter } from '../ui';

interface Props {
  editable?: boolean;
}

export const CartList = ({ editable = false }: Props) => {
  const { cart } = useContext(CartContext);

  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href="/" passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: '5px' }}
                  ></CardMedia>
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1">{product.title}</Typography>
            <Typography variant="body1">
              Talla: <strong>{product.size}</strong>
            </Typography>
            {editable ? (
              <ItemCounter
                currentValue={product.quantity}
                maxValue={10}
                updatedQuantity={() => {}}
              />
            ) : (
              <Typography variant="h5">{`${product.quantity} ${
                product.quantity > 1 ? 'productos' : 'producto'
              }`}</Typography>
            )}
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>
            {editable && (
              <Button variant="text" color="secondary">
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
