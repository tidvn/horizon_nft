import { create } from 'zustand';
import { Lucid, Blockfrost } from "lucid-cardano";
import { enviroments } from "@/constants";

interface LucidState {
    lucid: Lucid | null;
    setLucid: (lucid: Lucid) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useLucidStore = create<LucidState>((set) => ({
    lucid: null,
    setLucid: (lucid) => set({ lucid }),
    loading: false,
    setLoading: (loading) => set({ loading }),
}));
