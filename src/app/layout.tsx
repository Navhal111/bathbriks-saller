import type { Metadata } from "next";
import { inter, lexendDeca } from "@/app/fonts";
import cn from "@/utils/class-names";
import NextProgress from "@/components/next-progress";
import { ThemeProvider, JotaiProvider } from "@/app/shared/theme-provider";
import { ReduxProvider } from "@/store/ReduxProvider";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";
import "./globals.css";
import LayoutVisibility from "@/layouts/layoutVisibility";
import { AuthProvider } from "@/@core/contexts/AuthContext";

export const metadata: Metadata = {
  title: "App Name",
  description: "Write your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <ThemeProvider>
          <ReduxProvider>
            <NextProgress />
            <JotaiProvider>
              <LayoutVisibility>
                <AuthProvider>
                  {children}
                </AuthProvider>
              </LayoutVisibility>
              <GlobalDrawer />
              <GlobalModal />
            </JotaiProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
