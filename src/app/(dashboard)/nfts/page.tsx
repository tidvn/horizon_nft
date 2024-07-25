"use client";
import { Button } from "@/components/ui/button";
import { redeemer } from "@/constants/redeemer";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types";
import { Address, Constr, Data, SpendingValidator, TxHash } from "lucid-cardano";

import { useContext } from "react";
type Metadata = {
  name: string;
  image: string;
};


const Home = () => {
  const { lucid, } = useContext<LucidContextType>(LucidContext);
  function utf8ToHex(str: string): string {
    return Buffer.from(str, 'utf8').toString('hex');
  }
if (!lucid) {
    return;
  }

  console.log(lucid);

  const mintingPolicy: SpendingValidator = {
    type: "PlutusV2",
    script: "49480100002221200101",
  };
  const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
  const alwaysSucceedAddress: Address = lucid.utils.validatorToAddress(mintingPolicy,);
 

  const handleMint = async (
    assetName: string,
    metadata: Metadata,
  ): Promise<TxHash> => {
    const refNft = policyId + '000643b0' + utf8ToHex(assetName);
    const userToken = policyId + '000de140' + utf8ToHex(assetName);
    // const datumMetadata = Data.to(new Constr(0, [Data.fromJson(metadata), BigInt(1)]));
    const tx = await lucid
      .newTx()
      // .mintAssets({ [refNft]: BigInt(1), [userToken]: BigInt(1) }, redeemer())
      // .payToContract(alwaysSucceedAddress, datumMetadata, { [refNft]: BigInt(1) })
      .payToAddress(await lucid.wallet.address(), { [userToken]: BigInt(1) })
      .attachMintingPolicy(mintingPolicy)
      .complete();

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    return txHash;
  }
  
  
  return (
    <>
      <Button onClick={()=>handleMint("MK", { name: "MONKEY", image: "ipfs://Qme49fCRJ1CNcUCWEhG75b53vZ8tpBLyvmEhNwPYyCXpn5"})}> mint cip68</Button>
    </>
  );
}
export default Home;