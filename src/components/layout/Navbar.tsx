'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '../../contexts/UserContext';
import { useCart } from '../../contexts/CartContext';
import { ShoppingBag, User as UserIcon, Search, Menu } from 'lucide-react';
import LocaleSwitcher from '../common/LocaleSwitcher';

export default function Navbar() {
    const { user, login, logout, isAuthenticated } = useUser();
    const { totalItems } = useCart();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white navbar-luxury sticky-top">
            <div className="container d-flex align-items-center">
                <button className="navbar-toggler border-0 ps-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
                    <Menu size={24} />
                </button>

                <Link href="/" className="navbar-brand font-serif fw-bold fs-3 tracking-widest text-uppercase mx-auto">
                    Fashion.AI
                </Link>

                <div className="d-flex align-items-center gap-3">
                    <button className="btn p-0 d-md-block">
                        <Search size={20} />
                    </button>

                    <div className="dropdown">
                        <button className="btn p-0 dropdown-toggle no-caret" data-bs-toggle="dropdown">
                            <UserIcon size={20} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-3 p-3">
                            {isAuthenticated ? (
                                <>
                                    <li className="px-3 py-2 fw-bold small text-muted text-uppercase">Hello, {user?.name}</li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link href="/profile" className="dropdown-item py-2">My Profile</Link></li>
                                    <li><button onClick={logout} className="dropdown-item py-2 text-danger">Logout</button></li>
                                </>
                            ) : (
                                <li>
                                    <button onClick={() => login('user@example.com')} className="btn btn-primary w-100 rounded-0">
                                        Mock Login
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>

                    <Link href="/cart" className="position-relative">
                        <ShoppingBag size={20} />
                        {totalItems > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.6rem' }}>
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>

                <div className="collapse navbar-collapse order-3 order-lg-1" id="navbarMain">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3 mt-lg-0">
                        <li className="nav-item">
                            <Link href="/" className="nav-link px-3 text-uppercase small tracking-wider">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/catalog" className="nav-link px-3 text-uppercase small tracking-wider">Shop</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
