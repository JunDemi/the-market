import "./globals.css";
import { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registry"; //모든 항목에 styled components가 적용하게
import NavBar from "@/components/NavBar";
import RecoilRootProvider from "./RecoilRootProvider";

export const metadata: Metadata = {
  title: {
    default: "The Market | 홈",
    template: "The Market | %s",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <RecoilRootProvider>
        <div className="container">
          <NavBar />
          <div className="main-container">
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </div>
        </div>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
