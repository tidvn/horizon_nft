"use client"

import { createContext } from "react";
import React from "react";
import { LucidContextType } from "@/types";

export const LucidContext = createContext<LucidContextType>(null!);

export const useLucid = () => {
    const context = React.useContext<LucidContextType>(LucidContext)
    
    if (context === undefined)
      throw new Error("wrap your application in <LucidProvider> to use useLucid components")
    return context
}

