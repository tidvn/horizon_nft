"use client"

import { createContext, PropsWithChildren, useContext } from "react";
import { SmartContractContextType } from "@/types";

const SmartContractContext = createContext<SmartContractContextType>(null!);

export const useSmartContract = () => {
    const context = useContext<SmartContractContextType>(SmartContractContext)

    if (context === undefined)
        throw new Error("wrap your application in <SmartContractProvider> to use useSmartContract components")
    return context
}

export const SmartContractProvider = function ({ children }: PropsWithChildren) {

    const mintCip68 = async function () {

    };
    return (
        <SmartContractContext.Provider value={{ mintCip68 }}>
            {children}
        </SmartContractContext.Provider>
    );
};