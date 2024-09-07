"use client";
import { Button } from "@/components/ui/button";
import { useCardano } from "@/blockchain/cardano";
const LucidPage = () => {
  const { lucid } = useCardano();
  const handleMint = async () => {
    console.log(lucid);
  }

  return (
    <>
      <Button onClick={handleMint}> mint cip68</Button>
    </>
  );
}
export default LucidPage;