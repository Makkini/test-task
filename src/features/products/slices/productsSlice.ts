import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "../../../api/productsApi";

interface ProductsState {
    products: any;
    items: Product[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
}
//@ts-ignore
const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 8,
};

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        return await fetchProducts();
    }
);

export const createProductAsync = createAsyncThunk(
    'products/createProduct',
    async (product: Omit<Product, 'id'>) => {
        return await createProduct(product);
    }
);

export const updateProductAsync = createAsyncThunk(
    'products/updateProduct',
    async (product: Product) => {
        return await updateProduct(product);
    }
);

export const deleteProductAsync = createAsyncThunk(
    'products/deleteProduct',
    async (id: number) => {
        await deleteProduct(id);
        return id;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<number>) {
            const product = state.items.find(p => p.id === action.payload);
            if (product) {
                product.isFavorite = !product.isFavorite;
            }
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })
            .addCase(createProductAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
                state.loading = false;
            })
            .addCase(createProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create product';
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update product';
            })
            .addCase(deleteProductAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete product';
            });
    }
});

export const { toggleFavorite, setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;