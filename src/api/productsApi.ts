import { DEFAULT_IMAGE_URL, Product } from '../features/products/types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/photos?_limit=50`);
    const data = await response.json();
    return data.map((item: any) => ({
        id: item.id,
        title: item.title || 'No Title',
        description: `Description for product ${item.id}`,
        imageUrl: DEFAULT_IMAGE_URL,
        isFavorite: false
    }));
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch(`${API_URL}/photos`, {
        method: 'POST',
        body: JSON.stringify({
            title: product.title,
            url: product.imageUrl,
            thumbnailUrl: product.imageUrl
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await response.json();
    return {
        ...product,
        id: data.id || Date.now(),
        isFavorite: false
    };
};

export const updateProduct = async (product: Product): Promise<Product> => {
    const response = await fetch(`${API_URL}/photos/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: product.title,
            url: product.imageUrl,
            thumbnailUrl: product.imageUrl
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await response.json();
    return {
        ...product,
        title: data.title || product.title,
        imageUrl: data.url || product.imageUrl
    };
};

export const deleteProduct = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/photos/${id}`, {
        method: 'DELETE',
    });
};