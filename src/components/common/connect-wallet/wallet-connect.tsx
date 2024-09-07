"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCallback, useMemo, useState } from "react";
import { enviroments } from "@/constants";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { isNil } from "lodash";
import { useCardano, useIsConnectedToTheCorrectNetwork, constants, utility, WalletProvider } from "@/blockchain/cardano";

export default function WalletButton() {
    const { network } = enviroments;
    // const { wallet, connect, disconnect } = useWallet();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);

    const { supportedWalletProviders: allProviders } = constants;
    const { shortAddress } = utility;

    const {
        account,
        availableProviders,
        walletProvider,
        setWalletApiLoading,
        setWalletProvider,
        walletApiError,
        accountError,
        networkError,
    } = useCardano()

    const onWalletProviderChange = useCallback((provider: WalletProvider) => {
        setWalletApiLoading(true)
        setWalletProvider(provider)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isValid = useMemo(
        () => isNil(walletApiError) && isNil(accountError) && isNil(networkError),
        [walletApiError, accountError, networkError]
    )
    const isConnectedToTheCorrectNetwork = useIsConnectedToTheCorrectNetwork()
    const currentProvider = availableProviders.find((p:any) => p.key === walletProvider)
    return (
        <div className="flex flex-col">
            {isValid &&
                currentProvider?.icon &&
                isConnectedToTheCorrectNetwork &&
                !isNil(account.address) ?
                (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button
                                    className="w-full gap-2 items-center"
                                >
                                    <Image
                                        src={currentProvider?.icon || ""}
                                        alt={`${walletProvider} icon`}
                                        height={walletProvider === "nami" ? 24 : 32}
                                        width={walletProvider === "nami" ? 24 : 32}
                                    />
                                    {shortAddress(account.address)}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={async () => {
                                    await navigator.clipboard.writeText(account.address || "");
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 400);
                                }}>
                                    {copied ? 'Copied' : 'Copy Address'}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setWalletProvider(undefined)
                                        setDialogOpen(false)
                                    }}
                                >
                                    Disconnect
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Button onClick={() => setDialogOpen(true)}>
                            Connect Wallet
                        </Button>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Connect a wallet on {network.toLowerCase()} to continue </DialogTitle>
                                    <div className="flex flex-col gap-4 items-center pt-6">
                                        {allProviders.sort().map((provider) => {
                                            const availableProvider = availableProviders.find((p:any) => p.key === provider)

                                            if (isNil(availableProvider)) {
                                                return;
                                            }
                                            return (
                                                <>
                                                    <Button
                                                        className="w-full max-w-[80%] gap-2 items-center"
                                                        onClick={() => {
                                                            if (provider !== walletProvider) {
                                                                onWalletProviderChange(provider)
                                                                setDialogOpen(false)
                                                            }
                                                        }}
                                                    >
                                                        <Image
                                                            src={availableProvider?.icon || ""}
                                                            alt={`${provider} icon`}
                                                            width={provider === "nami" ? 26 : 32}
                                                            height={provider === "nami" ? 26 : 32}
                                                        />
                                                        {provider}
                                                    </Button></>
                                            )
                                        })}
                                    </div>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
        </div>
    );
}