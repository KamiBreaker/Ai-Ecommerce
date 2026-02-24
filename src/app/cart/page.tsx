'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import { useCatalog } from '../../contexts/CatalogContext';
import { Trash2, ChevronLeft, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const { items, removeFromCart, totalPrice, totalItems } = useCart();
    const { products } = useCatalog();

    if (items.length === 0) {
        return (
            <div className="container py-5 text-center my-5">
                <h1 className="font-serif mb-4 display-4">Your Bag is Empty</h1>
                <p className="text-muted mb-5">Looks like you haven't added anything to your collection yet.</p>
                <Link href="/catalog" className="btn btn-primary px-5 py-3">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="font-serif mb-5 display-5">Shopping Bag ({totalItems})</h1>

            <div className="row g-5">
                <div className="col-lg-8">
                    <div className="list-group list-group-flush border-top border-bottom">
                        {items.map((item) => {
                            const product = products.find((p) => p.id === item.productId);
                            if (!product) return null;

                            return (
                                <div key={item.productId} className="list-group-item py-4 border-0">
                                    <div className="row align-items-center g-4">
                                        <div className="col-4 col-md-3">
                                            <div className="bg-light aspect-ratio-3-4 d-flex align-items-center justify-content-center text-muted p-2 text-center" style={{ fontSize: '0.6rem' }}>
                                                {/* Hidden */}
                                            </div>
                                        </div>
                                        <div className="col-8 col-md-9">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <p className="text-muted small text-uppercase mb-1">{product.category}</p>
                                                    <h5 className="font-serif mb-0">Item</h5>
                                                </div>
                                                <p className="fw-bold mb-0">--</p>
                                            </div>
                                            <p className="text-muted small mb-4">Qty: {item.quantity}</p>
                                            <button
                                                onClick={() => removeFromCart(product.id)}
                                                className="btn btn-link text-danger p-0 d-flex align-items-center gap-2 small"
                                            >
                                                <Trash2 size={16} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-4">
                        <Link href="/catalog" className="btn btn-link text-dark p-0 d-flex align-items-center gap-2">
                            <ChevronLeft size={18} /> Continue Shopping
                        </Link>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 bg-linen p-4 sticky-top" style={{ top: '100px' }}>
                        <h4 className="font-serif mb-4">Order Summary</h4>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted">Subtotal</span>
                            <span className="fw-bold">BDT {totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted">Estimated Shipping</span>
                            <span className="text-success small fw-bold">FREE</span>
                        </div>
                        <div className="d-flex justify-content-between mb-4 border-top pt-3 mt-3">
                            <span className="h5 font-serif mb-0">Total</span>
                            <span className="h5 font-serif mb-0">BDT {totalPrice.toLocaleString()}</span>
                        </div>
                        <button className="btn btn-dark w-100 py-3 d-flex align-items-center justify-content-center gap-2">
                            Checkout <ArrowRight size={18} />
                        </button>
                        <div className="mt-4 text-center">
                            <p className="text-muted small">Inclusive of all local taxes for Bangladesh.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
