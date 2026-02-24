import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-linen pt-5 pb-4 mt-5 border-top">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <h5 className="font-serif fw-bold mb-4">Fashion.AI</h5>
                        <p className="small text-muted mb-4 col-lg-10">
                            The ethical nexus of machine intelligence and human creativity.
                            Based in Dhaka, designing for the world.
                        </p>
                    </div>
                    <div className="col-6 col-lg-2">
                        <h6 className="text-uppercase small tracking-widest mb-4 fw-bold">Shop</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><Link href="/catalog?cat=Category 1" className="text-decoration-none text-muted">Category 1</Link></li>
                            <li className="mb-2"><Link href="/catalog?cat=Category 2" className="text-decoration-none text-muted">Category 2</Link></li>
                            <li className="mb-2"><Link href="/catalog?cat=Category 3" className="text-decoration-none text-muted">Category 3</Link></li>
                            <li className="mb-2"><Link href="/catalog" className="text-decoration-none text-muted">New Arrivals</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <h6 className="text-uppercase small tracking-widest mb-4 fw-bold">Stay connected</h6>
                        <p className="small text-muted mb-3">Get the latest trend reports and exclusive drops.</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control rounded-0 border-dark bg-transparent" placeholder="Email Address" />
                            <button className="btn btn-dark rounded-0 px-3">Join</button>
                        </div>
                    </div>
                </div>
                <div className="border-top mt-5 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <p className="small text-muted mb-0">© 2026 Fashion.AI Ecosystem. Built for Excellence.</p>
                    <div className="d-flex gap-4">
                        <span className="small text-muted">English</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
