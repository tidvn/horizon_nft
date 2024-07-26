"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import wallets from "@/constants/wallets";
import { useState } from "react";
import { IWallet } from "@/types";

import { enviroments } from "@/constants";
import WalletItem from "./wallet-item";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useLucid } from "@/contexts/LucidContext";
import { useWallet } from "@/contexts/WalletContext";


export default function ConnectWallet() {
    const { network } = enviroments;
    const { lucid } = useLucid();
    const { wallet, disconnect } = useWallet();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);

    const handleDisconnect = async () => {
        await disconnect();
    };
    return (
        <div className="flex flex-col mr-5">

            {!wallet ? (
                <>
                    <Button
                        onClick={() => setDialogOpen(true)}
                    >
                        Connect Wallet
                    </Button>
                </>
            ) : (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                variant="secondary"
                                className="w-full gap-2 items-center"
                            >
                                <Image
                                    src={wallet.image}
                                    alt={wallet.name}
                                    width={24}
                                    height={24}
                                />
                                {wallet?.balance || 0}
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
                            <DropdownMenuItem onClick={handleDisconnect}>Disconnect</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Connect a wallet on {network.toLowerCase()} to continue </DialogTitle>
                        {
                            !lucid ? (
                                <div className="flex flex-col gap-4 items-center pt-6">
                                    {wallets.map(function (wallet: IWallet, index: number) {
                                        return <WalletItem wallet={wallet} key={index} />;
                                    })}
                                </div>
                            ) : (<>wallet connected</>)
                        }
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}