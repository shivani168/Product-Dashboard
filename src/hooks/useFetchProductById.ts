import { useState } from 'react';
import { getProductById } from '../utils/api.ts';

const useFetchProductById = (productId: string) => {
  const [productDetails, setProductDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProductById(productId);
      setProductDetails(data);
    } catch (err: any) {
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  return {
    productDetails,
    loading,
    error,
    fetchProduct,
  };
};

export default useFetchProductById;
