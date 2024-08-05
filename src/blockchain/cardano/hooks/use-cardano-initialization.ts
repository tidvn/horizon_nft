import { UseCardanoOptionsWithDefaults } from "../types"
import { useLucidAndWalletApi } from "./use-lucid-and-wallet-api"
import { useWalletProviders } from "./use-wallet-providers"

export const useCardanoInitialization = (options: UseCardanoOptionsWithDefaults) => {
  useWalletProviders(options)
  useLucidAndWalletApi(options)
}
