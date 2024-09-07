"use client";
import { useCardanoInitialization } from "../hooks/use-cardano-initialization"
import { UseCardanoError } from "../lib/errors"
import { Lucid, WalletApi } from "lucid-cardano"
import React, { useMemo, useState } from "react"
import { defaultContextState, defaultOptions, UseCardanoContext } from "./CardanoContext"
import { AvailableProvider, UseCardanoOptionsWithDefaults, UseCardanoWarning, WalletProvider } from "../types";


const Injector = ({ children, options }: React.PropsWithChildren<Props>) => {
  useCardanoInitialization(options)

  return <>{children}</>
}

interface Props {
  options: UseCardanoOptionsWithDefaults
}

export const CardanoProvider = ({
  children,
  options: userOptions,
}: React.PropsWithChildren<Props>) => {
  const options = useMemo(() => ({ ...defaultOptions, ...userOptions }), [userOptions])

  const [toasterShowCount, setToasterShowCount] = useState(0)
  const [isInitialized, setIsInitialized] = useState<boolean | undefined>(false)
  const [text, setText] = useState<string | undefined>(undefined)
  const [info, setInfo] = useState<string | undefined>(undefined)
  const [lucid, setLucid] = useState<Lucid | undefined>(undefined)
  const [walletApi, setWalletApi] = useState<WalletApi | undefined>(undefined)
  const [account, setAccount] = useState(defaultContextState.account)
  const [accountLoaded, setAccountLoaded] = useState(defaultContextState.accountLoaded)
  const [walletProvider, setWalletProvider] = useState<WalletProvider | undefined>(undefined)
  const [networkId, setNetworkId] = useState<number | undefined>(undefined)
  const [networkWarning, setNetworkWarning] = useState<UseCardanoWarning | undefined>(undefined)
  const [networkError, setNetworkError] = useState<UseCardanoError | undefined>(undefined)
  const [walletApiError, setWalletApiError] = useState<UseCardanoError | undefined>(undefined)
  const [availableProviders, setAvailableProviders] = useState<AvailableProvider[]>([])
  const [accountError, setAccountError] = useState<UseCardanoError | undefined>(undefined)
  const [accountWarning, setAccountWarning] = useState<UseCardanoWarning | undefined>(undefined)
  const [walletApiLoading, setWalletApiLoading] = useState(false)
  const [toasterIsShowingState, setToasterIsShowing] = useState(false)
  const toasterIsShowing = React.useMemo(() => toasterIsShowingState, [toasterIsShowingState])
  const hideToaster = React.useCallback(() => setToasterIsShowing(false), [])
  const showToaster = React.useCallback((text?: string, info?: string) => {
    setToasterIsShowing(true)
    setToasterShowCount((count) => count + 1)
    if (text) setText(text)
    if (info) setInfo(info)
  }, [])

  // todo, what else could make this invalid?
  const isValid = React.useMemo(() => lucid !== undefined, [lucid])

  return (
    <UseCardanoContext.Provider
      value={{
        allowedNetworks: options.allowedNetworks,
        testnetNetwork: options.testnetNetwork,
        isValid,
        isInitialized,
        setIsInitialized,
        text,
        info,
        walletApi,
        setWalletApi,
        lucid,
        setLucid,
        networkId,
        setNetworkId,
        networkWarning,
        setNetworkWarning,
        networkError,
        setNetworkError,
        walletApiError,
        setWalletApiError,
        accountError,
        setAccountError,
        account,
        setAccount,
        accountLoaded,
        setAccountLoaded,
        accountWarning,
        setAccountWarning,
        walletApiLoading,
        setWalletApiLoading,
        walletProvider,
        setWalletProvider,
        availableProviders,
        setAvailableProviders,
        toasterIsShowing,
        toasterShowCount,
        showToaster,
        hideToaster,
      }}
    >
      <Injector options={options}>{children}</Injector>
    </UseCardanoContext.Provider>
  )
}
