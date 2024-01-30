import ProductDetail from "@/components/market-components/ProductDetail";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "상품정보",
};

export default function MarketDetail() {
  return (
    <>
       <ProductDetail/>
    </>
  );
}
