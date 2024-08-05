import { WalletProvider } from "../types"

const key = "use-cardano/reconnect-to"

export const setStoredWalletProvider = (provider?: WalletProvider) => {
  if (!provider) return localStorage.removeItem(key)

  return localStorage.setItem(key, provider)
}

export const getStoredWalletProvider = () => localStorage.getItem(key) as WalletProvider
