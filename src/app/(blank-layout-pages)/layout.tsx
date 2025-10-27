"use client";

import { AuthProvider } from "@/@core/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { JotaiProvider, ThemeProvider } from "../(dashboard)/shared/theme-provider";
import { ReduxProvider } from "@/store/ReduxProvider";
import NextProgress from "@/components/next-progress";
import GlobalDrawer from "../(dashboard)/shared/drawer-views/container";
import GlobalModal from "../(dashboard)/shared/modal-views/container";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ThemeProvider>
                <ReduxProvider>
                    <NextProgress />
                    <JotaiProvider>
                        {children}
                        <Toaster position="top-right" reverseOrder={false} />
                        <GlobalDrawer />
                        <GlobalModal />
                    </JotaiProvider>
                </ReduxProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}
