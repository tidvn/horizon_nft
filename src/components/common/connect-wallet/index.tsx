import dynamic from "next/dynamic"
const ConnectWallet = dynamic(
    async () => (await import("./wallet-connect")),
    { ssr: false }
  )
  
export default function ConnectWalletButton() {
  return <ConnectWallet />
}