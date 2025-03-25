export interface Product {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    isFavorite: boolean;
}

export const DEFAULT_IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcR5U16C8yXgBpl7-Bc7Itjx3_LRl425zINA&s';