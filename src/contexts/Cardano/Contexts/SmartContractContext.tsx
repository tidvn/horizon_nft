"use client"

import { SmartContractContextType } from "@/types";
import { createContext, useContext } from "react";


const SmartContractContext = createContext<SmartContractContextType>(null!);

export const useSmartContract = () => {
    const context = useContext<SmartContractContextType>(SmartContractContext)

    if (context === undefined)
        throw new Error("wrap your application in <SmartContractProvider> to use useSmartContract components")
    return context
}


export default SmartContractContext;