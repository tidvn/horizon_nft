import dynamic from "next/dynamic"

const ConnectWallet = dynamic(
  async () => (await import("@use-cardano")).CardanoWalletSelector,
  { ssr: false }
)

export default function ConnectWalletButton() {
  return <ConnectWallet />
}