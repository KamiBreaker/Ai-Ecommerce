'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useRouter } from 'next/navigation';
import { Users, Package, BarChart3, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
    const { user, isAdmin, isAuthenticated } = useUser();
    const router = useRouter();
    const [data, setData] = useState({ users: [], products: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        if (!isAdmin) {
            router.push('/');
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/data');
                const result = await res.json();
                if (res.ok) {
                    setData(result);
                }
            } catch (err) {
                console.error('Failed to fetch admin data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated, isAdmin, router]);

    if (loading) return <div className="container py-5 text-center px-4"><p className="font-serif">Loading excellence...</p></div>;

    return (
        <div className="container-fluid py-5 px-lg-5">
            <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-4">
                <div>
                    <h1 className="font-serif display-5 mb-2">Internal Systems</h1>
                    <p className="text-muted small text-uppercase tracking-widest">Administrative Control Panel</p>
                </div>
                <div className="d-flex align-items-center gap-3 bg-linen p-3 px-4 border">
                    <ShieldCheck className="text-dark" size={24} />
                    <div>
                        <p className="mb-0 small fw-bold">{user?.name}</p>
                        <p className="mb-0 x-small text-muted text-uppercase tracking-wider">System Administrator</p>
                    </div>
                </div>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card border-0 bg-linen p-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <Users size={20} className="text-muted" />
                            <span className="badge bg-dark rounded-0 px-3 py-2">{data.users.length}</span>
                        </div>
                        <h3 className="h6 text-uppercase tracking-wider mb-2">Total Users</h3>
                        <p className="display-6 mb-0 font-serif">{data.users.length}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 bg-linen p-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <Package size={20} className="text-muted" />
                            <span className="badge bg-dark rounded-0 px-3 py-2">{data.products.length}</span>
                        </div>
                        <h3 className="h6 text-uppercase tracking-wider mb-2">Items in Catalog</h3>
                        <p className="display-6 mb-0 font-serif">{data.products.length}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 bg-linen p-4 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <BarChart3 size={20} className="text-muted" />
                            <span className="badge bg-success rounded-0 px-3 py-2">Active</span>
                        </div>
                        <h3 className="h6 text-uppercase tracking-wider mb-2">System Status</h3>
                        <p className="display-6 mb-0 font-serif text-success">Optimal</p>
                    </div>
                </div>
            </div>

            <div className="row g-5">
                <div className="col-lg-7">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="font-serif h4 mb-0">Registered Users</h2>
                        <button className="btn btn-sm btn-outline-dark rounded-0 px-4">Export CSV</button>
                    </div>
                    <div className="table-responsive bg-white border">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-4 py-3 small text-uppercase tracking-widest border-0">Name</th>
                                    <th className="py-3 small text-uppercase tracking-widest border-0">Email</th>
                                    <th className="py-3 small text-uppercase tracking-widest border-0">Role</th>
                                    <th className="px-4 py-3 small text-uppercase tracking-widest border-0">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.users.map((u: any) => (
                                    <tr key={u.id}>
                                        <td className="px-4 py-3 fw-bold">{u.name}</td>
                                        <td className="py-3 text-muted">{u.email}</td>
                                        <td className="py-3">
                                            <span className={`badge rounded-0 px-2 py-1 ${u.role === 'ADMIN' ? 'bg-danger' : 'bg-secondary'}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-muted small">{new Date(u.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="font-serif h4 mb-0">Live Catalog</h2>
                        <button className="btn btn-sm btn-dark rounded-0 px-4">+ New Product</button>
                    </div>
                    <div className="list-group rounded-0 border">
                        {data.products.length === 0 ? (
                            <div className="p-5 text-center text-muted border-bottom">
                                <p className="mb-0 italic small">No products currently in persistent storage.</p>
                            </div>
                        ) : (
                            data.products.map((p: any) => (
                                <div key={p.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <div>
                                        <p className="mb-0 fw-bold">{p.name}</p>
                                        <p className="mb-0 x-small text-muted text-uppercase">{p.category}</p>
                                    </div>
                                    <div className="text-end">
                                        <p className="mb-0 small fw-bold">{p.currency} {p.price.toLocaleString()}</p>
                                        <p className="mb-0 x-small text-muted">Stock: {p.stock}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .x-small { font-size: 0.65rem; }
            `}</style>
        </div>
    );
}
