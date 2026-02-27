'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const slides = [
        "Sign up or log in to your account to access exclusive content.",
        "Track your orders, returns, and manage your personal information.",
        "Discover the future of synthetic fashion and AI-driven design."
    ];

    const handleContinueAsGuest = () => {
        // Logically we would set a 'guest' flag in cookie/localStorage
        localStorage.setItem('onboarded', 'true');
        router.push('/');
    };

    return (
        <div className="onboarding-viewport d-flex flex-column align-items-center justify-content-between py-5 text-white text-center">
            {/* Background Overlay */}
            <div className="onboarding-bg"></div>

            <div className="onboarding-content w-100 px-4 mt-auto">
                {/* Logo */}
                <h1 className="font-serif display-1 tracking-widest mb-5 fw-bold">FASHION.AI</h1>

                {/* Text Carousel / Steps */}
                <div className="px-4 mb-4" style={{ minHeight: '80px' }}>
                    <p className="lead fw-light mb-0">
                        {slides[step]}
                    </p>
                </div>

                {/* Indicators */}
                <div className="d-flex justify-content-center gap-2 mb-5">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setStep(i)}
                            className={`rounded-pill cursor-pointer ${step === i ? 'bg-white' : 'bg-white opacity-25'}`}
                            style={{ width: '8px', height: '8px', cursor: 'pointer' }}
                        ></div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column gap-3 w-100 max-width-mobile mx-auto">
                    <Link href="/login" className="btn btn-light rounded-0 py-3 fw-bold text-uppercase tracking-wider">
                        Log In
                    </Link>
                    <Link href="/signup" className="btn btn-outline-light rounded-0 py-3 fw-bold text-uppercase tracking-wider">
                        Sign Up
                    </Link>
                </div>

                <div className="mt-5">
                    <button
                        onClick={handleContinueAsGuest}
                        className="btn btn-link text-white text-decoration-none small text-uppercase tracking-widest opacity-75 hover-opacity-100"
                    >
                        Continue as a Guest
                    </button>
                </div>
            </div>

            <style jsx>{`
                .onboarding-viewport {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 9999;
                    background-color: #000;
                    overflow: hidden;
                }
                .onboarding-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), 
                                url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop');
                    background-size: cover;
                    background-position: center;
                    z-index: -1;
                }
                .onboarding-content {
                    max-width: 800px;
                }
                .max-width-mobile {
                    max-width: 400px;
                }
                .cursor-pointer {
                    cursor: pointer;
                }
                .hover-opacity-100:hover {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    );
}
