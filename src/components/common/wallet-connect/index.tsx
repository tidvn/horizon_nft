import dynamic from "next/dynamic"

const WalletButtonDynamic = dynamic(
  async () => (await import("./wallet-button")),
  { ssr: false }
)

export default function ConnectWalletButton() {
  return <WalletButtonDynamic />
}