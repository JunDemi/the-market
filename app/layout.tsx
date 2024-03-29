import "./globals.css";
import { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registry"; //모든 항목에 styled components가 적용하게
import NavBar from "@/components/NavBar";
import RecoilRootProvider from "./lib/RecoilRootProvider";
import AuthProvider from "@/app/lib/AuthProvider";
import ReactQueryProvider from "./lib/ReactQueryProvider";

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
        <StyledComponentsRegistry>
          <ReactQueryProvider>
            <AuthProvider>
              <RecoilRootProvider>
                <div className="container">
                  <NavBar />
                  <div className="main-container">{children}</div>
                </div>
              </RecoilRootProvider>
            </AuthProvider>
          </ReactQueryProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
