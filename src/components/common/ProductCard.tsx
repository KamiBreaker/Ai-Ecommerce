'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { Sparkles, Plus } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <div className="card h-100 card-fashion">
            <div className="position-relative overflow-hidden aspect-ratio-3-4 bg-light">
                <Link href={`/products/${product.id}`} className="text-decoration-none h-100 d-block">
                    <div className="bg-linen h-100 d-flex align-items-center justify-content-center text-muted small">
                        {/* Hidden */}
                    </div>
                </Link>
                {product.isAiGenerated && (
                    <div className="position-absolute top-0 start-0 m-3 px-2 py-1 bg-white ai-glow d-flex align-items-center gap-1 small fw-bold">
                        <Sparkles size={12} className="text-gold" />
                        <span className="text-uppercase tracking-tighter" style={{ fontSize: '0.65rem' }}>AI Crafted</span>
                    </div>
                )}
                <button
                    onClick={() => addToCart(product)}
                    className="btn btn-dark position-absolute bottom-0 end-0 m-3 p-2 rounded-circle shadow-lg d-flex align-items-center justify-content-center hover-up"
                    style={{ width: '40px', height: '40px' }}
                >
                    <Plus size={20} />
                </button>
            </div>
            <div className="card-body px-0 pt-2">
                <div className="text-center">
                    <p className="text-muted small text-uppercase mb-0 tracking-widest" style={{ fontSize: '0.65rem' }}>{product.category}</p>
                </div>
            </div>
        </div>
    );
}
