"use client";

import { CardanoProvider } from "./CardanoContexts";

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