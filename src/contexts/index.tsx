"use client";

import AuthProvider from "./Authentication/AuthProvider";
import { CardanoProvider } from "./Cardano/Provider";

const ContextProvider = function ({ children }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AuthProvider>
                <CardanoProvider>
                    {children}
                </CardanoProvider>
            </AuthProvider>

        </>
    );
};

export default ContextProvider;