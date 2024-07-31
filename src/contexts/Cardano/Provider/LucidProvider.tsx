import { enviroments } from "@/constants";
import { Blockfrost, Lucid } from "lucid-cardano";
import { PropsWithChildren, useEffect, useState } from "react";
import { LucidContext } from "@/contexts/Cardano/Contexts/LucidContext";

const LucidProvider = function ({ children }: PropsWithChildren) {
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

export default LucidProvider;