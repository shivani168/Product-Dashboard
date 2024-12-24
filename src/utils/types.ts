export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: string;
  }

  export interface ProductsApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  