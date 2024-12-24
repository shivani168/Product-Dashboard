import React from 'react';
import { Box } from '@mui/material';
import ProductCard from './ProductCard.tsx'; 
import { Product } from '../../utils/types.ts';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Box sx={{ margin: '20px 0' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 2fr))',
          gap: '25px',
          padding: '25px',
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
