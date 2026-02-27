'use client';

import React from 'react';
import StylistChat from '@/components/AI/StylistChat';

export default function StylistPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 px-4 flex items-center justify-center">
            <StylistChat />
        </main>
    );
}
