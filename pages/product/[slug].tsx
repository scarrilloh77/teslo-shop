import { GetServerSideProps, NextPage } from 'next';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';
import { ProductSlideShow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  // ---------------------------------------------
  //***Proccess without CEO***
  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(
  //   `/products/${router.query.slug}`
  // );
  // ---------------------------------------------

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
              <SizeSelector
                selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>
            {/* <Chip label="No hay disponibles" variant="outlined" color="error" /> */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// getServerSideProps: Generates page from server. Cada vez que venga un request a esta vista, el servidor va a procesar y renderizar y generar la respuesta, lo cual se quiere evitar.
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
