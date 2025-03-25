import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = useSelector((state: RootState) =>
        state.products.products.find((p: { id: number; }) => p.id === Number(id))
    );

    if (!product) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4">Product not found</Typography>
                <Button component={Link} to="/products" sx={{ mt: 2 }}>
                    Back to Products
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Button component={Link} to="/products" sx={{ mb: 4 }}>
                Back to Products
            </Button>

            <Card>
                <CardMedia
                    component="img"
                    height="400"
                    image={product.imageUrl}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Product ID: {product.id}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetailPage;