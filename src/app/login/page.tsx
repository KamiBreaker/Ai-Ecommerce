'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../../contexts/UserContext';
import { ShoppingBag, User as UserIcon, Search, Menu } from 'lucide-react';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { setUser } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('onboarded', 'true');
                setUser(data.user);
                router.push('/');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center py-5 bg-white">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-lg-4 text-center">
                        <Link href="/onboarding" className="text-decoration-none text-dark d-block mb-5">
                            <h2 className="font-serif display-6 tracking-widest text-uppercase fw-bold">FASHION.AI</h2>
                        </Link>

                        <h1 className="font-serif h3 mb-4">Welcome Back</h1>
                        <p className="text-muted small mb-5 tracking-wide">Log in to your account to access exclusive content.</p>

                        <form onSubmit={handleSubmit} className="text-start">
                            {error && <div className="alert alert-danger small rounded-0 border-0 mb-4">{error}</div>}

                            <div className="mb-4">
                                <label className="form-label small text-uppercase tracking-wider text-muted">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control rounded-0 border-dark-subtle border-top-0 border-start-0 border-end-0 px-0 focus-none"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="mb-5">
                                <label className="form-label small text-uppercase tracking-wider text-muted">Password</label>
                                <input
                                    type="password"
                                    className="form-control rounded-0 border-dark-subtle border-top-0 border-start-0 border-end-0 px-0 focus-none"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-dark w-100 rounded-0 py-3 text-uppercase tracking-widest mb-4"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>

                            <div className="text-center">
                                <Link href="/signup" className="text-decoration-none text-muted small tracking-wide">
                                    Don't have an account? <span className="text-dark fw-bold border-bottom border-dark pb-1">Sign Up</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .focus-none:focus {
                    box-shadow: none;
                    border-color: #000;
                }
            `}</style>
        </div>
    );
}
