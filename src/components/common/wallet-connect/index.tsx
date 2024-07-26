import dynamic from "next/dynamic"
import { cn } from "@/utils/cn"
import { buttonVariants } from "@/components/ui/button"

const WalletButtonDynamic = dynamic(
  async () => (await import("./wallet-button")),
  { ssr: false }
)

export default function ConnectWalletButton() {
  return <WalletButtonDynamic />
}