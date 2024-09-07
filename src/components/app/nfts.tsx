"use client";
import { Button } from "@/components/ui/button";
import { Metadata } from "@/types";
import { utf8ToHex } from "@/utils/utf8ToHex";
import { useCardano } from "@/blockchain/cardano";
import { Address, Constr, Data, SpendingValidator } from "lucid-cardano";
const NftPage = () => {
    const { lucid } = useCardano();
    
    const handleMint = async () => {
        if (!lucid) return;
        const assetName = "cip68";
        const metadata: Metadata = {
            name: "cip68",
            image: "https://gateway.pinata.cloud/ipfs/QmV6V5a1J4LQ6z1Xo2KQFzv3e8q8Zg9ZbQJ1QYh3VzUJ4r",
        };
        const mintingPolicy: SpendingValidator = {
            type: "PlutusV2",
            script: "49480100002221200101",
        };
        const alwaysSucceedAddress: Address = lucid.utils.validatorToAddress(mintingPolicy,);
        const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
        const refNft = policyId + '000643b0' + utf8ToHex(assetName); // tính ra tên refNFT
        const userToken = policyId + '000de140' + utf8ToHex(assetName);
        const datumMetadata = Data.to(new Constr(0, [Data.fromJson(metadata), 1n]));

        const tx = await lucid
            .newTx()
            .mintAssets({ [refNft]: 1n, [userToken]: 1n }, Data.void())// mint refNft and user token pair
            .payToContract(alwaysSucceedAddress, datumMetadata, { [refNft]: 1n }) // send userToken to user wallet address
            .payToAddress(await lucid.wallet.address(), { [userToken]: 1n })
            .attachMintingPolicy(mintingPolicy)
            .complete();

        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        console.log(txHash);
    }

    return (
        <>
            <Button onClick={handleMint}> mint cip68</Button>
        </>
    );
}
export default NftPage;