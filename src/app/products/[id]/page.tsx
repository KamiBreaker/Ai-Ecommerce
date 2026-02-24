'use client';

import React, { use } from 'react';
import { useCatalog } from '../../../contexts/CatalogContext';
import { useCart } from '../../../contexts/CartContext';
import { ShoppingBag, ChevronLeft, Star, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { products } = useCatalog();
    const { addToCart } = useCart();

    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <h1 className="font-serif">Product Not Found</h1>
                <Link href="/" className="btn btn-link">Back Home</Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="/" className="text-decoration-none text-muted">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/catalog" className="text-decoration-none text-muted">Shop</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                </ol>
            </nav>

            <div className="row g-5">
                <div className="col-lg-7">
                    <div className="bg-linen h-100 d-flex align-items-center justify-content-center text-muted border" style={{ minHeight: '600px' }}>
                        <span className="lead font-serif">{product.name}</span>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="ps-lg-4">
                        <span className="text-muted text-uppercase small tracking-widest">{product.category}</span>
                        <h1 className="font-serif display-5 mb-3">Item</h1>

                        <div className="d-flex align-items-center gap-3 mb-4">
                            {/* Price Hidden */}
                        </div>

                        <p className="text-muted mb-5 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="mb-5">
                            <div className="d-flex align-items-center gap-4 mb-4">
                                <div className="input-group" style={{ width: '120px' }}>
                                    <button className="btn btn-outline-secondary btn-sm" type="button">-</button>
                                    <input type="text" className="form-control text-center bg-white border-secondary" defaultValue="1" readOnly />
                                    <button className="btn btn-outline-secondary btn-sm" type="button">+</button>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="btn btn-dark flex-grow-1 py-3 d-flex align-items-center justify-content-center gap-2"
                                >
                                    <ShoppingBag size={20} /> Add to Bag
                                </button>
                            </div>
                            <button className="btn btn-outline-dark w-100 py-3">Buy Now</button>
                        </div>

                        <div className="border-top pt-4">
                            <div className="row g-4">
                                <div className="col-6">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <Truck size={20} className="text-primary" />
                                        <span className="fw-bold small">Next-Day Delivery</span>
                                    </div>
                                    <p className="text-muted small mb-0">Free shipping on orders over 5,000 BDT.</p>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <ShieldCheck size={20} className="text-primary" />
                                        <span className="fw-bold small">Authentic Design</span>
                                    </div>
                                    <p className="text-muted small mb-0">Verified creator studio product.</p>
                                </div>
                            </div>
                        </div>

                        {product.isAiGenerated && (
                            <div className="mt-5 p-4 bg-linen ai-glow">
                                <h5 className="font-serif mb-2">AI Creator Insights</h5>
                                <p className="small text-muted mb-0">
                                    This item was co-designed with our AI neural engine. Patterns were optimized for
                                    maximal aesthetic harmony and cultural resonance.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
