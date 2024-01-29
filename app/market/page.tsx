import { Metadata } from "next";
import "../../asset/main.scss";
import ProductBasic from "@/components/market-components/ProductBasic";
export const metadata: Metadata = {
  title: "마켓",
};

export const dynamic = 'force-dynamic'
export default function Market() {
  return (
    <>
        <ProductBasic />
    </>
  );
}
