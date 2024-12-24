import {ProductsApiResponse} from '../utils/types.ts';
const BASE_URL = 'https://dummyjson.com'; 

const handleApiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || 'Something went wrong');
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// GET: Get all products
export const getProducts = async (limit: number): Promise<ProductsApiResponse> => {
  const url = `${BASE_URL}/products?limit=${limit}`;
  return handleApiRequest<ProductsApiResponse>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// GET: Get a single product by ID
export const getProductById = async (productId: string): Promise<any> => {
  const url = `${BASE_URL}/products/${productId}`;
  return handleApiRequest<any>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// GET: Get products with sorting
export const getProductWithSorting = async (sortBy: string): Promise<any> => {
  const url = `${BASE_URL}/products?sort=${sortBy}`;
  return handleApiRequest<any>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// POST: Create a new product
export const createProduct = async (product: any): Promise<any> => {
  const url = `${BASE_URL}/products`;
  return handleApiRequest<any>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
};

// PUT: Update an existing product
export const updateProduct = async (productId: string, product: any): Promise<any> => {
  const url = `${BASE_URL}/products/${productId}`;
  return handleApiRequest<any>(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
};

// DELETE: Delete a product
export const deleteProduct = async (productId: string): Promise<void> => {
  const url = `${BASE_URL}/products/${productId}`;
  await handleApiRequest<void>(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
