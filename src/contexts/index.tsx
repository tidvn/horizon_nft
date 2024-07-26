"use client";

import dynamic from 'next/dynamic';

const CardanoProvider = dynamic(() => import('./cardanoProvider'), { ssr: false });

const ContextProvider = function ({ children }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <CardanoProvider>
                {children}
            </CardanoProvider>
        </>
    );
};

export default ContextProvider;