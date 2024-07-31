/* eslint-disable no-unused-vars */
"use client";

import { createContext } from "react";
import { WalletContextType } from "@/types";
import React from "react";


const WalletContext = createContext<WalletContextType>(null!);


export const useWallet = () => {
  const context = React.useContext(WalletContext)

  if (context === undefined)
    throw new Error("wrap your application in <WalletContext> to use useWallet components")
  return context
}
export default WalletContext;