"use client";

import { AuthProvider } from "@/@core/contexts/AuthContext";
import HydrogenLayout from "@/layouts/hydrogen/layout";
import { Toaster } from "react-hot-toast";
import { JotaiProvider, ThemeProvider } from "./shared/theme-provider";
import { ReduxProvider } from "@/store/ReduxProvider";
import NextProgress from "@/components/next-progress";
import GlobalDrawer from "./shared/drawer-views/container";
import GlobalModal from "./shared/modal-views/container";
import AuthGuard from "@/kit/hoc/AuthGuard";

export default function Layout({ children, }: { children: React.ReactNode; }) {
    return (
        <AuthProvider>
            <AuthGuard>
                <ThemeProvider>
                    <ReduxProvider>
                        <NextProgress />
                        <JotaiProvider>
                            <HydrogenLayout>
                                {children}
                                <Toaster position="top-right" reverseOrder={false} />
                            </HydrogenLayout>
                            <GlobalDrawer />
                            <GlobalModal />
                        </JotaiProvider>
                    </ReduxProvider>
                </ThemeProvider>
            </AuthGuard>
        </AuthProvider>
    );
}
