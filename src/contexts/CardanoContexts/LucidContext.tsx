"use client"

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import React from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import { enviroments } from "@/constants";
import { LucidContextType } from "@/types";

const LucidContext = createContext<LucidContextType>(null!);

export const LucidProvider = function ({ children }: PropsWithChildren) {
    const [lucid, setLucid] = useState<Lucid>(null!);
    const [loading, setLoading] = useState<boolean>(false);
    const [lucidPlatform, setLucidPlatform] = useState<Lucid>(null!);

    useEffect(() => {
        (async function () {
            setLoading(true);
            const lucid = await Lucid.new(
                new Blockfrost(enviroments.blockfrost_api_url, enviroments.blockfrost_api_key),
                enviroments.network,
            );
            setLucidPlatform(lucid);
            setLoading(false);
        })();
    }, []);

    return (
        <LucidContext.Provider value={{ loading, lucid: lucid, setLucid, lucidPlatform }}>
            {children}
        </LucidContext.Provider>
    );
};

export const useLucid = () => {
    const context = React.useContext<LucidContextType>(LucidContext)
    
    if (context === undefined)
      throw new Error("wrap your application in <LucidProvider> to use useLucid components")
    return context
}