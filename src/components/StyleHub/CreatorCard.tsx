'use client';

import React from 'react';
import { Heart, Grid } from 'lucide-react';

interface CreatorCardProps {
    creator: {
        id: string;
        name: string;
        avatar: string;
    };
    image: string;
    price: number;
}

export default function CreatorCard({ creator, image, price }: CreatorCardProps) {
    return (
        <div className="card-fashion h-100 position-relative rounded-4 overflow-hidden shadow-sm">
            <div className="aspect-ratio-3-4">
                <img
                    alt="Style Design"
                    className="w-100 h-100 object-fit-cover"
                    src={image}
                />
            </div>
            <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-dark-transparent">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <img
                            alt={creator.name}
                            className="rounded-circle border border-white shadow-sm"
                            src={creator.avatar}
                            style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="d-flex flex-column align-items-end gap-2">
                        <div className="bg-white px-2 py-1 rounded shadow-sm">
                            <span className="small fw-bold font-serif" style={{ fontSize: '0.75rem' }}>BDT {price.toLocaleString()}</span>
                        </div>
                        <button className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
                            <Heart size={14} className="text-dark" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
