'use client';

import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export default function LocaleSwitcher() {
    return (
        <div className="dropdown">
            <button
                className="btn btn-sm btn-link text-dark text-decoration-none d-flex align-items-center gap-1 dropdown-toggle no-caret"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <Globe size={16} />
                <span className="small fw-bold text-uppercase tracking-wider">BD / BDT</span>
                <ChevronDown size={12} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 small">
                <li><h6 className="dropdown-header">Region & Currency</h6></li>
                <li><button className="dropdown-item d-flex justify-content-between active" type="button">
                    <span>Bangladesh (BDT)</span>
                    <span>৳</span>
                </button></li>
                <li><button className="dropdown-item d-flex justify-content-between" type="button">
                    <span>USA (USD)</span>
                    <span>$</span>
                </button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><h6 className="dropdown-header">Language</h6></li>
                <li><button className="dropdown-item active" type="button">English</button></li>
                <li><button className="dropdown-item" type="button">Bengali</button></li>
            </ul>
        </div>
    );
}
