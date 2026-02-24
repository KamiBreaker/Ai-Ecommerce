'use client';

import React, { useState } from 'react';
import { useCatalog } from '../../contexts/CatalogContext';
import ProductCard from '../../components/common/ProductCard';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function Catalog() {
    const { filteredProducts, filters, setSearch, setCategory } = useCatalog();
    const [showFilters, setShowFilters] = useState(false);

    const categories = ['All', 'Category 1', 'Category 2', 'Category 3', 'Category 4'];

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="font-serif display-4">All Collections</h1>
                <p className="text-muted">Refining the boundaries of digital and physical apparel.</p>
            </div>

            <div className="row mb-5 g-4 align-items-center">
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0 rounded-0"><Search size={18} /></span>
                        <input
                            type="text"
                            className="form-control border-start-0 rounded-0 ps-0"
                            placeholder="Search items..."
                            value={filters.searchQuery || ''}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat === 'All' ? undefined : cat)}
                                className={`btn btn-sm text-uppercase tracking-widest px-4 border-0 rounded-0 ${(filters.category === cat || (!filters.category && cat === 'All'))
                                    ? 'btn-dark'
                                    : 'btn-outline-secondary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                        <button
                            className="btn btn-sm btn-outline-dark rounded-0 px-3 d-flex align-items-center gap-2 ms-md-3"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter size={16} /> Filters
                        </button>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-5">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                        <div key={p.id} className="col-6 col-md-4 col-lg-3">
                            <ProductCard product={p} />
                        </div>
                    ))
                ) : (
                    <div className="col-12 py-5 text-center">
                        <h3 className="text-muted font-serif">No products match your description.</h3>
                        <button className="btn btn-link mt-2" onClick={() => { setSearch(''); setCategory(undefined); }}>Clear all filters</button>
                    </div>
                )}
            </div>

        </div>
    );
}
