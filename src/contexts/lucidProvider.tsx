"use client";

import { ReactNode, useEffect, useState } from "react";
import { useLucidStore } from "@/store/useLucid";
import { Blockfrost, Lucid } from "lucid-cardano";
import { enviroments } from "@/constants";

type Props = {
    children: ReactNode;
};

const LucidProvider = ({ children }: Props) => {
    const { setLucid,setLoading } = useLucidStore();
    useEffect(() => {
        (async function () {
            setLoading(true);
            const lucid = await Lucid.new(
                new Blockfrost(enviroments.blockfrost_api_url, enviroments.blockfrost_api_key),
                enviroments.network,
            );
            setLucid(lucid);
            setLoading(false);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{children}</>;
};

export default LucidProvider;
function setLucidPlatform(lucid: Lucid) {
    throw new Error("Function not implemented.");
}

