'use client';

import React from 'react';
import Link from 'next/link';
import { useCatalog } from '../contexts/CatalogContext';
import ProductCard from '../components/common/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const { products } = useCatalog();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="pb-5">
      {/* Hero Section */}
      <section className="bg-linen pt-5 pb-5 mb-5 overflow-hidden">
        <div className="container py-lg-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-1 font-serif mb-4 fw-bold">Elegance, <br /><span className="text-muted italic">Synthesized.</span></h1>
              <p className="lead text-muted mb-5">
                Discover the world's first fashion ecosystem where human creativity meets AI precision. Exclusive drops from top creators and synthetic studios.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link href="/catalog" className="btn btn-primary px-5 py-3">Explore Collection</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="font-serif display-5">Curated Categories</h2>
          </div>
          <Link href="/catalog" className="text-dark text-decoration-none d-flex align-items-center gap-2 mb-2">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="row g-4">
          {[
            { name: 'Category 1', id: 'Category 1' },
            { name: 'Category 2', id: 'Category 2' },
            { name: 'Category 3', id: 'Category 3' }
          ].map((cat, i) => (
            <div key={i} className="col-md-4">
              <Link href={`/catalog?cat=${cat.id}`} className="text-decoration-none">
                <div className="card border-0 bg-linen p-5 text-center h-100 hover-up shadow-sm d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
                  <h3 className="card-title font-serif mb-0 text-dark">{cat.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mb-5">
        <div className="text-center mb-5">
          <h2 className="font-serif display-6">Trending Now</h2>
          <div className="bg-primary mx-auto" style={{ width: '40px', height: '2px' }}></div>
        </div>
        <div className="row g-4">
          {featuredProducts.map((p) => (
            <div key={p.id} className="col-6 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
