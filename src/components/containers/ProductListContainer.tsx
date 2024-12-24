import React, { useEffect, useState, useCallback} from 'react';
import { useProductContext } from '../../context/ProductContext.tsx';
import useFetchProducts from '../../hooks/useFetchProducts.ts';
import ProductList from '../presenters/ProductList.tsx';
import { Product } from '../../utils/types.ts';
import { CircularProgress, Button, Chip } from '@mui/material';
import '../../styles/ProductListContainer.css';
import { categories } from '../../utils/constants.ts';

const ProductListContainer: React.FC = () => {
  const [limit, setLimit] = useState<number>(9);
  const [sortBy, setSortBy] = useState<string>(''); 
  const [category, setCategory] = useState<string>(''); 
  const [rating, setRating] = useState<string>(''); 
  const [minPrice, setMinPrice] = useState<number | ''>(''); 
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [appliedFilters, setAppliedFilters] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 

  const { products, setProducts } = useProductContext();
  const { hit: fetchProducts, state: { data: fetchedProducts, pending: loading, error } } = useFetchProducts(limit); 

  useEffect(() => {
    setProducts([]); 
    fetchProducts(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  useEffect(() => {
    if (fetchedProducts.length > 0) {
      setProducts((prevProducts: Product[]) => {
        // Ensure we only add new products
        const newProducts = fetchedProducts.filter(
          (product) => !prevProducts.some((p) => p.id === product.id)
        );
        return [...prevProducts, ...newProducts]; 
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedProducts]);

  const mergedProducts = [...products, ...fetchedProducts];
  const uniqueProducts = Array.from(
    new Map(mergedProducts.map(item => [item.id, item])).values()
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLElement;
    const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom && !loading) {
      setLimit((prevLimit) => prevLimit + 9); 
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRating = e.target.value;
    setRating(selectedRating);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    if (type === 'min') {
      setMinPrice(value ? parseFloat(value) : '');
    } else {
      setMaxPrice(value ? parseFloat(value) : '');
    }
  };

  const applyFilters = useCallback(() => {
    let filteredProducts = [...products]; 
  
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product?.category?.toLowerCase() === category.toLowerCase()
      );
    }
    if (rating) {
      filteredProducts = filteredProducts.filter(product => Number(product.rating) >= parseFloat(rating));
    }
  
    if (minPrice !== '' || maxPrice !== '') {
      filteredProducts = filteredProducts.filter((product) => {
        const productPrice = Number(product?.price) || 0; 
        const min = minPrice !== '' ? Number(minPrice) : 0;
        const max = maxPrice !== '' ? Number(maxPrice) : Infinity;
    
        return productPrice >= min && productPrice <= max;
      });
    }
    
    if (sortBy === 'price_asc') {
      filteredProducts.sort((a: Product, b: Product) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      filteredProducts.sort((a: Product, b: Product) => b.price - a.price);
    }
    const uniqueProducts = Array.from(
      new Map(filteredProducts.map(product => [product.id, product])).values()
    );
    const appliedFiltersList: any[] = [];
    if (sortBy) appliedFiltersList.push({ label: `Sort by: ${sortBy === "price_asc" ? "Price: Low to High" : sortBy === "price_desc" ? "Price: High to Low" : ""}`, value: 'sortBy' });
    if (category) appliedFiltersList.push({ label: `Category: ${category}`, value: 'category' });
    if (rating) {
      if (rating !== "5") {
        appliedFiltersList.push({ label: `Rating: ${rating} Stars & Up`, value: 'rating' });
      } else {
        appliedFiltersList.push({ label: `Rating: ${rating} Stars`, value: 'rating' }); 
      }
    }
    
    if (minPrice || maxPrice) appliedFiltersList.push({ label: `Price: ${minPrice || 'Any'} - ${maxPrice || 'Any'}`, value: 'priceRange' });
  
    setAppliedFilters(appliedFiltersList);
    setFilteredProducts(uniqueProducts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, rating, minPrice, maxPrice, sortBy, products]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, applyFilters]);
  

  const resetFilters = () => {
    setSortBy('');
    setCategory('');
    setRating('');
    setMinPrice('');
    setMaxPrice('');
    setAppliedFilters([]);
    setFilteredProducts([]); 
  };

  const appliedFiltersDisplay = appliedFilters.map((filter, index) => {
    return (
      <Chip 
        key={index} 
        label={filter.label} 
        onDelete={() => {
          const updatedFilters = appliedFilters.filter((_, i) => i !== index);
          setAppliedFilters(updatedFilters);

          switch (filter.value) {
            case 'category':
              setCategory('');
              break;
            case 'rating':
              setRating('');
              break;
            case 'sortBy':
              setSortBy('');
              break;
            case 'priceRange':
              setMinPrice('');
              setMaxPrice('');
              break;
            default:
              break;
          }
        }} 
      />
    );
  });
  
  

  

  return (
    <div>
      <div className="filters-container">
        <select className="custom-select" onChange={handleSortChange} value={sortBy}>
          <option value="" disabled>Sort by</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <select className="custom-select" onChange={handleCategoryChange} value={category}>
          <option value="" disabled>Filter by Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <select className="custom-select" onChange={handleRatingChange} value={rating}>
          <option value="" disabled>Filter by Rating</option>
          <option value="1">1 Star & Up</option>
          <option value="2">2 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
          <option value="4">4 Stars & Up</option>
          <option value="5">5 Stars Only</option>
        </select>
        <div className="price-range">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice || ''}
            onChange={(e) => handlePriceChange('min', e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice || ''}
            onChange={(e) => handlePriceChange('max', e.target.value)}
          />
        </div>

        {/* <Button onClick={applyFilters} variant="contained" color="primary">Apply Filters</Button> */}
        <Button onClick={resetFilters} variant="outlined" className="reset-button">Reset Filters</Button>
      </div>
        {appliedFilters?.length !== 0 && (
              <div className="applied-filters">
                <p>Applied Filters:</p>
                <div className="applied-filtersDisplay">
                  {appliedFiltersDisplay}
                </div>
        </div>)}

      <div onScroll={handleScroll} style={{ overflowY: 'auto', maxHeight: '60vh', minHeight: '60vh' }}>
      {error && <p>Oops! Something went wrong</p>}
  
        {appliedFilters.length > 0 && filteredProducts.length === 0  && !loading? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Sorry, no products found</p>
        ) : (
          <ProductList products={filteredProducts.length > 0 ? filteredProducts : uniqueProducts} />
        )}

        {loading && (
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListContainer;
