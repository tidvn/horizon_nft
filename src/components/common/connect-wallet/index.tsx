import dynamic from "next/dynamic"

const ConnectWallet = dynamic(
  async () => (await import("./wallet-button")),
  { ssr: false }
)

export default function ConnectWalletButton() {
  return <ConnectWallet />
}