import { Metadata } from "next";
import "../../asset/main.scss";
import Products from "@/components/market-components/Products";
export const metadata: Metadata = {
  title: "마켓",
};

export const dynamic = 'force-dynamic'
export default function Market() {
  return (
    <>
        <Products />
    </>
  );
}
