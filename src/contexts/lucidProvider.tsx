"use client";

import React, { ReactNode, useEffect } from "react";
import { useLucidStore } from "@/store";

type Props = {
    children: ReactNode;
};

const LucidProvider = ({ children }: Props) => {
    const { initializeLucid } = useLucidStore();

    useEffect(() => {
        initializeLucid();
    }, [initializeLucid]);

    return <>{children}</>;
};

export default LucidProvider;
