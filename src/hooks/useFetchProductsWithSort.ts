import { useState } from 'react';
import { getProductWithSorting } from '../utils/api.ts';

const useFetchProductsWithSort = (sortBy: string) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductsBySort = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProductWithSorting(sortBy);
      setProducts(data);
    } catch (err: any) {
      setError('Failed to fetch products with sorting');
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProductsBySort
  };
};

export default useFetchProductsWithSort;
