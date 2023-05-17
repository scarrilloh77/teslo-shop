import { IProduct } from '@/interfaces';
import useSWR, { SWRConfiguration } from 'swr';

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`, config); //back & front are in the same server (is not needed specify http...)
  return {
    products: data || [],
    isLoading,
    isError: error,
  };
};
