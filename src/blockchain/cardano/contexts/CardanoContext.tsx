
"use client";
import React  from "react"
import { DefaultUseCardanoOptions, UseCardanoContextState } from "../types";

// eslint-disable-next-line no-unused-vars
const noop = (..._: any[]) => {}

export const defaultContextState: UseCardanoContextState = {
  isValid: undefined,
  isInitialized: false,
  setIsInitialized: noop,
  text: "",
  info: "",
  lucid: undefined,
  setLucid: noop,
  walletApi: undefined,
  setWalletApi: noop,
  networkId: undefined,
  setNetworkId: noop,
  networkWarning: undefined,
  setNetworkWarning: noop,
  networkError: undefined,
  setNetworkError: noop,
  walletApiError: undefined,
  setWalletApiError: noop,
  account: {
    address: undefined,
    rewardAddress: undefined,
  },
  setAccount: noop,
  accountLoaded: false,
  setAccountLoaded: noop,
  accountError: undefined,
  setAccountError: noop,
  accountWarning: undefined,
  setAccountWarning: noop,
  walletApiLoading: false,
  setWalletApiLoading: noop,
  walletProvider: undefined,
  setWalletProvider: noop,
  availableProviders: [],
  setAvailableProviders: noop,
  toasterIsShowing: false,
  toasterShowCount: 0,
  showToaster: noop,
  hideToaster: noop,
}

export const defaultOptions: DefaultUseCardanoOptions = {
  autoConnectTo: undefined,
  autoReconnect: true,
  testnetNetwork: "Preview",
  allowedNetworks: ["Mainnet"],
  node: {
    provider: "blockfrost",
    proxyUrl: undefined,
    projectId: undefined,
  },
}

export const UseCardanoContext = React.createContext<UseCardanoContextState>(defaultContextState)

export const UseCardanoConsumer = UseCardanoContext.Consumer

export const useCardano = () => {
  const context = React.useContext<UseCardanoContextState>(UseCardanoContext)

  if (context === undefined)
    throw new Error("wrap your application in <CardanoProvider> to use useCardano components")

  return context
}
