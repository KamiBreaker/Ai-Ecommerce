'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function OnboardingGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const onboarded = localStorage.getItem('onboarded');
        const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/onboarding';

        if (!onboarded && !isAuthPage) {
            router.push('/onboarding');
        } else {
            setIsChecking(false);
        }
    }, [pathname, router]);

    // Don't render anything while we decide if they need to be redirected
    // This prevents the "flash" of the homepage
    if (isChecking) {
        return null;
    }

    return <>{children}</>;
}
