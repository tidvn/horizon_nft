"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from 'next-auth/react';
import { auth } from "@/services/auth";


const AuthProvider = async function ({ children }: PropsWithChildren) {
    const session = await auth();
    return (
        <>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </>
    );
};

export default AuthProvider;