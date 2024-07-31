import { toNetworkId, toNetworkName } from "./lib/network-dictionary"
import { supportedWalletProviders } from "./lib/supported-wallet-providers"
import { hasErrorCode } from "./lib/utils/has-error-code"
import { isError } from "./lib/utils/is-error"

export { useCardano } from "./contexts/CardanoContext"
export { CardanoToaster } from "./components/CardanoToaster"
export { CardanoWalletSelector } from "./components/CardanoWalletSelector"
export { CardanoProvider } from "./contexts/CardanoProvider"

export const utility = {
  toNetworkId,
  toNetworkName,
  hasErrorCode,
  isError,
}

export const constants = {
  supportedWalletProviders,
}

export { UseCardanoConsumer } from "./contexts/CardanoContext"
