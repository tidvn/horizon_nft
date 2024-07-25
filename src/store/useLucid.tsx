import create from "zustand";
import { Lucid, Blockfrost } from "lucid-cardano";
import { enviroments } from "@/constants";

interface LucidState {
    loading: boolean;
    lucid: Lucid | null;
    lucidPlatform: Lucid | null;
    setLucid: (lucid: Lucid) => void;
    initializeLucid: () => void;
}

export const useLucidStore = create<LucidState>((set) => ({
    loading: false,
    lucid: null,
    lucidPlatform: null,
    setLucid: (lucid) => set({ lucid }),
    initializeLucid: async () => {
        set({ loading: true });
        const lucid = await Lucid.new(
            new Blockfrost(enviroments.blockfrost_api_url, enviroments.blockfrost_api_key),
            enviroments.network
        );
        set({ lucidPlatform: lucid, loading: false });
    },
}));
