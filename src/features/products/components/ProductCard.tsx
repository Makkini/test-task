import React from 'react';
import { Product } from '../types';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Stack
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    onToggleFavorite: (id: number) => void;
    onRemove: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     product,
                                                     onToggleFavorite,
                                                     onRemove
                                                 }) => {
    const description = product.description || 'No description available';
    const truncatedDescription = description.length > 100
        ? `${description.substring(0, 100)}...`
        : description;

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl}
                    alt={product.title}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {truncatedDescription}
                    </Typography>
                </CardContent>
            </Link>

            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ p: 1, borderTop: '1px solid rgba(0,0,0,0.12)' }}
            >
                <IconButton
                    aria-label="add to favorites"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id);
                    }}
                >
                    <FavoriteIcon color={product.isFavorite ? 'error' : 'inherit'} />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(product.id);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Stack>
        </Card>
    );
};

export default ProductCard;