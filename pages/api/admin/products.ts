import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Product } from '@/models';
import { IProduct } from '@/interfaces';
import { isValidObjectId } from 'mongoose';

type Data =
  | {
      message: string;
    }
  | IProduct[]
  | IProduct;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    case 'PUT':
      return updateProduct(req, res);

    default:
      res.status(400).json({ message: 'Bad request!' });
  }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean();
  await db.disconnect();
  res.status(200).json(products);
};

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = '', images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    res.status(400).json({ message: 'El id del producto no es válido!' });
  }

  if (images.length < 2) {
    res.status(400).json({ message: 'Es necesario al menos 2 imágenes!' });
  }

  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      res.status(400).json({ message: 'No existe un producto con ese ID!' });
    }
    await product?.updateOne(req.body);
    await db.disconnect();
    res.status(200).json(product!);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({ message: 'Revisar la consola del servidor!' });
  }
};
