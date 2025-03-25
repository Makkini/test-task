import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import ProductCard from '../components/ProductCard';
import {
    Container,
    Grid,
    ButtonGroup,
    Button,
    Box,
    Typography,
    TextField
} from '@mui/material';
import { fetchProductsAsync, setCurrentPage, toggleFavorite, deleteProductAsync } from '../slices/productsSlice';
import {Link} from "react-router-dom";

const ProductsPage: React.FC = () => {
    const dispatch = useDispatch();
    const {
        items: products,
        error,
        currentPage,
        itemsPerPage
    } = useSelector((state: RootState) => state.products);

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'favorites'>('all');

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    const filteredProducts = products.filter(product => {
        const matchesFilter = filter === 'all' || product.isFavorite;
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage));
        window.scrollTo(0, 0);
    };

    const handleToggleFavorite = (id: number) => {
        dispatch(toggleFavorite(id));
    };

    const handleRemoveProduct = (id: number) => {
        // @ts-ignore
        dispatch(deleteProductAsync(id));
    };



    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Products</Typography>
                <Button component={Link} to="/create-product" variant="contained" color="primary">
                    Add Product
                </Button>
            </Box>

            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        dispatch(setCurrentPage(1)); // Сброс на первую страницу при поиске
                    }}
                    sx={{ mb: 2 }}
                />

                <ButtonGroup sx={{ mb: 2 }}>
                    <Button
                        variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => {
                            setFilter('all');
                            dispatch(setCurrentPage(1));
                        }}
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === 'favorites' ? 'contained' : 'outlined'}
                        onClick={() => {
                            setFilter('favorites');
                            dispatch(setCurrentPage(1));
                        }}
                    >
                        Favorites
                    </Button>
                </ButtonGroup>
            </Box>

            <Grid container spacing={3}>
                {paginatedProducts.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard
                            product={product}
                            onToggleFavorite={handleToggleFavorite}
                            onRemove={handleRemoveProduct}
                        />
                    </Grid>
                ))}
            </Grid>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <ButtonGroup variant="outlined">
                        <Button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Back
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "contained" : "outlined"}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Forward
                        </Button>
                    </ButtonGroup>
                </Box>
            )}
        </Container>
    );
};

export default ProductsPage;