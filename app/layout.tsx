import "./globals.css";
import { Metadata } from "next";
import StyledComponentsRegistry from "./lib/registry"; //모든 항목에 styled components가 적용하게

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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
