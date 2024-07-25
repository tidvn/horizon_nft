import { Network } from "lucid-cardano";

type Props = {
    address: string;
    pattern: string;
};

export const checkNetwork = function ({ address, pattern }: Props): Network {
    if (address.includes(pattern)) {
        return "Preprod";
    }
    return "Mainnet";
};