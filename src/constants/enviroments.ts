import { IEnviroment } from "@/types";
import { Network } from "lucid-cardano";

export const enviroments:IEnviroment = 
        {
            network: process.env.NEXT_PUBLIC_CARDANO_NETWORK as Network,
            blockfrost_api_url: process.env.NEXT_PUBLIC_BLOCKFROST_API_URL as string,
            blockfrost_api_key: process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY as string,
        };