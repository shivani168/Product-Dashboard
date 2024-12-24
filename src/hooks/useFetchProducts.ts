import { useState } from 'react';
import { getProducts } from '../utils/api.ts';
import { Product} from '../utils/types.ts';


const useFetchProducts = (limit: number) => {
  const [data, setData] = useState<Product[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const hit = async () => {
    if (pending) return;
  
    setPending(true);
    setError(null);
    try {
      const response = await getProducts(limit); // Fetch API response
      console.log('API Response:', response);
  
      // Validate response structure
      if (!response || !Array.isArray(response.products)) {
        throw new Error('Invalid products format');
      }
  
      const fetchedProducts: Product[] = response.products;
  
      setData((prevData) => [...prevData, ...fetchedProducts]); // Append to existing data
    } catch (err: any) {
      console.error('Error:', err); // Log the error
      setError(err.message || 'Failed to fetch products');
    } finally {
      setPending(false);
    }
  };
  

  return {
    hit,
    state: {
      data,
      pending,
      error,
    },
  };
};

export default useFetchProducts;
