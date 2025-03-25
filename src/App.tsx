import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductsPage from './features/products/pages/ProductsPage';
import ProductDetailPage from './features/products/pages/ProductDetailPage';
import CreateProductPage from './features/products/pages/CreateProductPage';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Container maxWidth="xl">
                        <Routes>
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/products/:id" element={<ProductDetailPage />} />
                            <Route path="/create-product" element={<CreateProductPage />} />
                            <Route path="/edit-product/:id" element={<CreateProductPage />} />
                            <Route path="/" element={<ProductsPage />} />
                        </Routes>
                    </Container>
                </Router>
            </ThemeProvider>
        </Provider>
    );
};

export default App;