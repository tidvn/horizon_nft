import { toNetworkId, toNetworkName } from "./lib/network-dictionary"
import { shortAddress } from "./lib/short-address"
import { supportedWalletProviders } from "./lib/supported-wallet-providers"
import { hasErrorCode } from "./lib/utils/has-error-code"
import { isError } from "./lib/utils/is-error"

export { useCardano } from "./contexts/CardanoContext"
export { useIsConnectedToTheCorrectNetwork } from "./hooks/use-is-connected-to-the-correct-network"

export  * from "./types"
export const utility = {
  toNetworkId,
  toNetworkName,
  hasErrorCode,
  isError,
  shortAddress
}

export const constants = {
  supportedWalletProviders,
}

export { UseCardanoConsumer } from "./contexts/CardanoContext"
