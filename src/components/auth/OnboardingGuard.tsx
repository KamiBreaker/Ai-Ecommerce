'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function OnboardingGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const onboarded = localStorage.getItem('onboarded');
        const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/onboarding';

        if (!onboarded && !isAuthPage) {
            router.push('/onboarding');
        }
    }, [pathname, router]);

    return <>{children}</>;
}
