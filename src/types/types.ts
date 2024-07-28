import { Network } from "lucid-cardano";
import { ComponentType } from "react";

export interface IRoute {
  path: string;
  name: string;
  description?: string;
  layout?: string;
  exact?: boolean;
  component?: ComponentType;
  disabled?:boolean
  icon?: JSX.Element ;
  secondary?: boolean;
  collapse?: boolean;
  items?: IRoute[];
  rightElement?: boolean;
  invisible?: boolean;
}
export interface IEnviroment {
  network: Network;
  blockfrost_api_url: string;
  blockfrost_api_key: string;
};


export interface IWallet  {
  name: string;
  image: string;
  balance?: number;
  address?: string;
  downloadApi?: string;
  api: () => Promise<any> | any;
  checkApi: () => Promise<any> | any;
};