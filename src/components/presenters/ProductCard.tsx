import React from 'react';
import { Box, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import ProductDetailModal from './ProductDetailsModal.tsx';

interface ProductCardProps {
  product: {
    reviews: any;
    thumbnail: string | undefined;
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const fullStars = Math.floor(product?.rating || 0); 
  const emptyStars = Math.max(5 - fullStars, 0);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        maxWidth: "350px",
        height: "500px", 
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s",
        display: "flex",
        flexDirection: "column", 
        "&:hover": {
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        component="img"
        src={product?.thumbnail}
        alt={product?.title}
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      {/* Product Details */}
      <Box sx={{ padding: "16px", flexGrow: 1 }}> 
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "10px" }}>
          <Typography fontWeight="bold" fontSize="16px">
            {product?.title}
          </Typography>
          <Typography fontWeight="bold" fontSize="14px">
            ${product?.price}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "8px", textTransform:"capitalize" }}
        >
          {product?.category}
        </Typography>

        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "8px",
            fontSize:"13px",
            marginTop:"25px",
            color:"#0000008f",
            fontWeight:"500"
          }}
        >
          {product?.description}{" "}
        </Typography>
        <Typography
            variant="body2"
            color="primary"
            sx={{
                fontSize: "12px",
                textDecoration: "underline",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                color: "#0E5AA7",  
                textDecoration: "none",  
                },
            }}
            onClick={handleOpenModal}
            >
            <ShoppingCart sx={{ fontSize: "16px", marginRight: "5px" }} />
            View Product
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px", padding: "16px" }}>
      {[...Array(fullStars || 0)].map((_, index) => (
        <Star key={`full-star-${index}`} sx={{ color: "#FFD700", fontSize: "20px" }} />
      ))}
      {[...Array(emptyStars || 0)].map((_, index) => (
        <StarBorder key={`empty-star-${index}`} sx={{ color: "#FFD700", fontSize: "20px" }} />
      ))}
        <Typography variant="body2" sx={{ marginLeft: "8px" }}>
          {product?.rating} | ({product?.reviews?.length || 0} reviews)
        </Typography>
      </Box>

        {/* Product Detail Modal */}
        <ProductDetailModal
          open={openModal}
          onClose={handleCloseModal}
          productId={product?.id}
      />
    </Box>
  );
};

export default ProductCard;
