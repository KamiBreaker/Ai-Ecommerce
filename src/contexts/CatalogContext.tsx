'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product, Creator, Collection, CatalogState } from '../types';
import { MOCK_PRODUCTS, MOCK_CREATORS, MOCK_COLLECTIONS } from '../lib/mock-data';

interface CatalogContextType extends CatalogState {
    setSearch: (query: string) => void;
    setCategory: (category: string | undefined) => void;
    filteredProducts: Product[];
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
    const [products] = useState<Product[]>(MOCK_PRODUCTS);
    const [creators] = useState<Creator[]>(MOCK_CREATORS);
    const [collections] = useState<Collection[]>(MOCK_COLLECTIONS);
    const [filters, setFilters] = useState<CatalogState['filters']>({});

    const setSearch = (query: string) => {
        setFilters((f) => ({ ...f, searchQuery: query }));
    };

    const setCategory = (category: string | undefined) => {
        setFilters((f) => ({ ...f, category }));
    };

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            if (filters.category && p.category !== filters.category) return false;
            if (filters.searchQuery && !p.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
            if (filters.onlyAi && !p.isAiGenerated) return false;
            return true;
        });
    }, [products, filters]);

    return (
        <CatalogContext.Provider value={{
            products,
            creators,
            collections,
            loading: false,
            filters,
            setSearch,
            setCategory,
            filteredProducts
        }}>
            {children}
        </CatalogContext.Provider>
    );
}

export function useCatalog() {
    const context = useContext(CatalogContext);
    if (context === undefined) {
        throw new Error('useCatalog must be used within a CatalogProvider');
    }
    return context;
}
