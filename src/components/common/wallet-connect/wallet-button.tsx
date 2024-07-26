"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { wallets } from "@/constants/wallets";
import { useState } from "react";
import { IWallet } from "@/types";
import { enviroments } from "@/constants";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { isNil } from "lodash";
import { useCardanoStore } from "@/store/useCardano";
import { cn } from "@/utils";
import { beautifullBalance } from "@/utils/beautifull-number";

export default function WalletButton(props:any) {
    const { network } = enviroments;
    const { wallet, connect, disconnect } = useCardanoStore();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);

    const handleDisconnectWallet = async () => {
        await disconnect();
    };
    const handleConnectWallet = async function (wallet: IWallet) {
        await connect({ api: wallet.api, name: wallet.name, image: wallet.image, checkApi: wallet.checkApi });
        setDialogOpen(false);
    };
    return (
        <div {...props} className={cn(`flex flex-col`,props.className)}>
            {isNil(wallet) ? (
                <>
                    <Button onClick={() => setDialogOpen(true)} >
                        Connect Wallet
                    </Button>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Connect a wallet on {network.toLowerCase()} to continue </DialogTitle>
                                <div className="flex flex-col gap-4 items-center pt-6">
                                    {wallets.map(async (wallet: IWallet) => {
                                        if (!(await wallet.checkApi())) {
                                            return;
                                        }
                                        return (
                                            <>
                                                <Button
                                                    className="w-full max-w-[80%] gap-2 items-center"
                                                    onClick={() => handleConnectWallet(wallet)}
                                                >
                                                    <Image
                                                        src={wallet.image}
                                                        alt={wallet.name}
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {wallet.name}
                                                </Button>
                                            </>
                                        )
                                    })}
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </>
            ) : (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className="w-full gap-2 items-center">
                                <Image
                                    src={wallet.image}
                                    alt={wallet.name}
                                    width={24}
                                    height={24}
                                />
                                {beautifullBalance(wallet?.balance)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={async () => {
                                await navigator.clipboard.writeText(wallet.address || "");
                                setCopied(true);
                                setTimeout(() => setCopied(false), 400);
                            }}>
                                {copied ? 'Copied' : 'Copy Address'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDisconnectWallet}>Disconnect</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )}
        </div>
    );
}