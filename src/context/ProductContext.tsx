import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../utils/types';


interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  filters: {
    category: string;
    priceRange: number[];
  };
  setFilters: (filters: { category: string; priceRange: number[] }) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

// Create the context with an initial value
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Create the ProductProvider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState({ category: '', priceRange: [0, 1000] });
  const [sortBy, setSortBy] = useState('price_asc');

  return (
    <ProductContext.Provider
      value={{ products, setProducts, selectedProduct, setSelectedProduct, filters, setFilters, sortBy, setSortBy }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use ProductContext
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
