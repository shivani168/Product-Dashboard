import React, { useEffect } from 'react';
import { Modal, Box, Typography, CircularProgress, Button, Divider } from '@mui/material';
import { StarRate } from '@mui/icons-material';
import useFetchProductById from '../../hooks/useFetchProductById.ts'; 
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LoopIcon from '@mui/icons-material/Loop';

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ open, onClose, productId }) => {
  const { productDetails, loading, error, fetchProduct } = useFetchProductById(productId);

  useEffect(() => {
    if (open && productId) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, productId]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="product-details-modal">
      <Box
        sx={{
          width: '60%',
          maxWidth: '1000px',
          margin: '100px auto',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {loading && <CircularProgress sx={{ margin: 'auto' }} />}

        {error && !loading && (
          <Typography variant="body1" color="error" sx={{ textAlign: 'center', width: '100%' }}>
            {error}
          </Typography>
        )}

        {!loading && !error && productDetails && (
          <>
            <Box sx={{ display: 'flex', gap: '30px' }}>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => window.open(productDetails?.thumbnail, '_blank')}
              >
                <img
                  src={productDetails?.thumbnail}
                  alt={productDetails?.title}
                  style={{
                    width: '80%',
                    maxWidth: '300px',
                    borderRadius: '12px',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Box>

              <Box sx={{ flex: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#333'}}>
                  {productDetails?.title}
                </Typography>
                <Typography variant="body1" sx={{fontSize:"14px", fontWeight:"500", color: '##000000bf', textTransform:"capitalize", marginTop:"-2px" }}>
                  Brand: <span style={{ color: '#888', fontWeight:"500" }}>{productDetails?.brand}</span>
                </Typography>
                <Typography variant="body2" sx={{fontSize:"12px", fontWeight:"500", color: '##000000bf', textTransform:"capitalize", marginBottom: '10px' }}>
                  SKU: <span style={{ color: '#888', fontWeight:"500" }}>{productDetails?.sku}</span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: '15px', color: '#0000008f', fontWeight: '500', marginBottom: '10px' }}
                >
                  {productDetails?.description}
                </Typography>

                <Typography variant="body2" sx={{ marginTop: '10px', color: '#888', textTransform:"capitalize" }}>
                  Price: <span style={{ color: '#1565c0' }}>$ {productDetails?.price}</span>
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '5px', color: '#888', textTransform:"capitalize" }}>
                  Category: {productDetails?.category}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                      marginTop: '10px',
                      fontWeight: '600',
                      color: productDetails?.stock > 0 ? (productDetails?.stock <= 5 ? '#ff9800' : '#4caf50') : '#f44336',
                      textTransform: 'capitalize',
                    }}
                  >
                    {productDetails?.stock > 0
                      ? productDetails?.stock <= 5
                        ? `Only ${productDetails?.stock} left in stock. Order soon!`
                        : 'In Stock'
                      : 'Out of Stock'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                  <SecurityIcon
                    sx={{
                      fontSize: '18px', 
                      color: '#4caf50', 
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#888' }}>
                    {productDetails.warrantyInformation}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                  <LocalShippingIcon
                    sx={{
                      fontSize: '18px', 
                      color: 'black', 
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#888' }}>
                    {productDetails.shippingInformation}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                  <LoopIcon
                    sx={{
                      fontSize: '18px', 
                      color: '#164881a3', 
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#888' }}>
                    {productDetails.returnPolicy}
                  </Typography>
                </Box>

                <Box sx={{ marginTop: '10px' }}>
                  <Typography variant="body2" sx={{ color: '#888', fontWeight: '500' }}>
                    Rating: {productDetails?.rating} <span style={{ color: '#1976d2' }}>({productDetails?.reviews?.length} reviews)</span>
                  </Typography>
                  <Box sx={{ display: 'flex', marginTop: '5px' }}>
                    {[...Array(5)].map((_, index) => (
                      <StarRate
                        key={index}
                        sx={{
                          color: index < Math.round(productDetails?.rating) ? '#ffd700' : '#e0e0e0',
                          fontSize: '18px',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontSize: "15px", marginBottom: "10px", fontWeight: 600, color: "#333" }}>
                Customer Reviews
              </Typography>

              {productDetails?.reviews?.length > 0 ? (
                <Box
                  sx={{
                    maxHeight: "300px",  // Limit the height of the reviews section
                    overflowY: "auto",   // Enable vertical scrolling when content overflows
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {productDetails.reviews.map((review, index) => (
                    <Box key={index} sx={{ marginBottom: "15px" }}>
                      <Typography variant="subtitle2" sx={{ fontSize: "13px", fontWeight: 500 }}>
                        {review.reviewerName} -{" "}
                        <span style={{ fontSize: "12px", color: "#888" }}>
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
                        {[...Array(5)].map((_, i) => (
                          <StarRate
                            key={i}
                            sx={{
                              color: i < review.rating ? "#ffd700" : "#e0e0e0",
                              fontSize: "16px",
                            }}
                          />
                        ))}
                      </Box>
                      <Typography variant="body2" sx={{ fontSize: "14px", color: "#555" }}>
                        {review.comment}
                      </Typography>
                      <Divider sx={{ marginTop: "10px" }} />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No reviews yet.
                </Typography>
              )}
            </Box>
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{
            alignSelf: 'flex-end',
            padding: '8px 16px',
            fontWeight: 500,
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ProductDetailModal;
