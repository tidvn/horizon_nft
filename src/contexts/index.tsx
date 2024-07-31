"use client";

import { CardanoProvider } from "./Cardano/Provider";

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