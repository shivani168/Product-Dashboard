import React from 'react';
import { ProductProvider } from './context/ProductContext.tsx';
import Dashboard from './pages/Dashboard.tsx';

const App: React.FC = () => {
  return (
    <ProductProvider>
      <Dashboard />
    </ProductProvider>
  );
};

export default App;
