"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { IWallet, WalletContextType } from "@/types";
import WalletContext from "@/contexts/components/WalletContext";
import { Button } from "@/components/ui/button";


type Props = {
    wallet: IWallet;
};

const WalletItem = function ({ wallet }: Props) {
    const [isDownload, setIsDownload] = useState<boolean>(true);
    const { connect, loading } = useContext<WalletContextType>(WalletContext);

    const handleConnectWallet = async function () {
        await connect({ api: wallet.api, name: wallet.name, image: wallet.image, checkApi: wallet.checkApi });
    };

    useEffect(() => {
        (async function () {
            setIsDownload(await wallet.checkApi());
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isDownload){
        return ;
    }
    return (
        <Button
            variant="secondary"
            className="w-full max-w-[80%] gap-2 items-center"
            onClick={handleConnectWallet}
            disabled={loading}
        >
            <Image
                src={wallet.image}
                alt={wallet.name}
                width={24}
                height={24}
            />
            {wallet.name}
        </Button>
);
};

export default WalletItem;
