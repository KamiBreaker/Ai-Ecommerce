export type Currency = 'BDT' | 'USD';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'creator' | 'admin';
  avatar?: string;
  location?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: Currency;
  image: string;
  category: string;
  tags: string[];
  creatorId: string;
  isAiGenerated: boolean;
  stock: number;
  rating: number;
}

export interface Creator {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  collections: string[]; // ids
  isAiCreator: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  creatorId: string;
  productIds: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number; // captured at time of add
}

export interface CatalogState {
  products: Product[];
  creators: Creator[];
  collections: Collection[];
  loading: boolean;
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    onlyAi?: boolean;
    searchQuery?: string;
  };
}
