import React from 'react';
import ProductListContainer from '../components/containers/ProductListContainer.tsx';
import { Box, Typography, AppBar, Toolbar, Container } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: "#333", boxShadow: "none" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
          <Typography
            variant="h6"
            sx={{
              fontStyle: 'italic',
              color: '#fff', 
              fontWeight: 600,
            }}
          >
            Strategywerks
          </Typography>

          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Typography variant="body1" sx={{ color: '#ddd', fontWeight: 500 }}>
              Products
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: '20px', flex: 1 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: '36px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#2c3e50',
            letterSpacing: '2px',
            marginBottom: '30px',
            fontFamily: '"Roboto", sans-serif', 
            textTransform: 'uppercase', 
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', 
          }}
        >
          Top Picks Collection
        </Typography>
        <ProductListContainer />
      </Container>

      <Box sx={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#6c757d' }}>
            © 2024 Strategywerks. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Typography variant="body2" sx={{ color: '#6c757d' }}>
              Privacy Policy
            </Typography>
            <Typography variant="body2" sx={{ color: '#6c757d' }}>
              Terms & Conditions
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
