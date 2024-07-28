/* eslint-disable no-unused-vars */
import { Lucid } from "lucid-cardano"
import { Metadata } from "@/types"

export type MintCip68Input = {
    lucid:Lucid,
    assetName:string,
    metadata:Metadata,
}
export type SmartContractContextType = {
    mintCip68 :(input:MintCip68Input)=> Promise<string>,
}