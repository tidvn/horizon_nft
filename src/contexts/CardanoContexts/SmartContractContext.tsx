"use client"

import { createContext, PropsWithChildren, useContext } from "react";
import { MintCip68Input, SmartContractContextType } from "@/types";
import mintingPolicy from "@/utils/validator";
import { Address, Constr, Data } from "lucid-cardano";
import {  utf8ToHex } from "@/utils";

const SmartContractContext = createContext<SmartContractContextType>(null!);

export const useSmartContract = () => {
    const context = useContext<SmartContractContextType>(SmartContractContext)

    if (context === undefined)
        throw new Error("wrap your application in <SmartContractProvider> to use useSmartContract components")
    return context
}

export const SmartContractProvider = function ({ children }: PropsWithChildren) {
    const mintCip68 = async function ({ lucid, assetName, metadata }: MintCip68Input) {
        const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
        const alwaysSucceedAddress: Address = lucid.utils.validatorToAddress(mintingPolicy,);
        const refNft = policyId + '000643b0' + utf8ToHex(assetName); // tính ra tên refNFT
        const userToken = policyId + '000de140' + utf8ToHex(assetName);
        const datumMetadata = Data.to(new Constr(0, [Data.fromJson(metadata), 1n]));
        
        const mintRedeemer = () => Data.void();
        const tx = await lucid
            .newTx()
            .mintAssets({ [refNft]: 1n, [userToken]: 1n }, mintRedeemer())// mint refNft and user token pair
            .payToContract(alwaysSucceedAddress, datumMetadata, { [refNft]: 1n }) // send userToken to user wallet address
            .payToAddress(await lucid.wallet.address(), { [userToken]: 1n })
            .attachMintingPolicy(mintingPolicy)
            .complete();
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
        return txHash;
    };
    return (
        <SmartContractContext.Provider value={{ mintCip68 }}>
            {children}
        </SmartContractContext.Provider>
    );
};