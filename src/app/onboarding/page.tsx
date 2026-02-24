'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../contexts/UserContext';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const { login } = useUser();

    const nextStep = () => {
        if (step === 3) {
            login('newuser@example.com');
            router.push('/');
        } else {
            setStep(step + 1);
        }
    };

    return (
        <div className="container py-5 my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <div className="mb-4">
                        <span className="badge bg-linen text-dark rounded-pill px-3 py-2">Step {step} of 3</span>
                    </div>

                    {step === 1 && (
                        <div className="animate-fade-in">
                            <Sparkles size={48} className="text-gold mb-4" />
                            <h1 className="font-serif mb-3">Welcome to the Nexus</h1>
                            <p className="text-muted mb-5">Fashion.AI is where high-end craft meets cutting-edge algorithms. Let's personalize your experience.</p>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in">
                            <h2 className="font-serif mb-4">Define Your Style</h2>
                            <div className="row g-3 mb-5">
                                {['Traditionalist', 'Futurist', 'Minimalist', 'Eclectic'].map((style) => (
                                    <div key={style} className="col-6">
                                        <button className="btn btn-outline-dark w-100 py-3 rounded-0">{style}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in">
                            <CheckCircle size={48} className="text-success mb-4" />
                            <h2 className="font-serif mb-3">System Ready</h2>
                            <p className="text-muted mb-5">Your personalized style engine is calibrated. Welcome to the future of fashion.</p>
                        </div>
                    )}

                    <button onClick={nextStep} className="btn btn-primary px-5 py-3 w-100 d-flex align-items-center justify-content-center gap-2">
                        {step === 3 ? 'Enter the Ecosystem' : 'Continue'} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
