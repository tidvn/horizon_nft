// "use client";
// import { Button } from "@/components/ui/button";
// import { Metadata } from "@/types";
// const NftPage = () => {
//   const { lucid } = useLucid();
//   const { mintCip68 } = useSmartContract();

//   const handleMint = async () => {
//     const assetName = "cip68";
//     const metadata: Metadata = {
//       name: "cip68",
//       image: "https://gateway.pinata.cloud/ipfs/QmV6V5a1J4LQ6z1Xo2KQFzv3e8q8Zg9ZbQJ1QYh3VzUJ4r",
//     };
//     const txHash = await mintCip68({ lucid, assetName, metadata });
//     console.log(txHash);
//   }

//   return (
//     <>
//       <Button onClick={handleMint}> mint cip68</Button>
//     </>
//   );
// }
// export default NftPage;