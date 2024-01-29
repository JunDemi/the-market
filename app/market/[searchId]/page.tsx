import ProductSearch from "@/components/market-components/ProductSearch";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "상품검색",
};

export const dynamic = 'force-dynamic'
export default function MarketSearch() {
  return (
    <>
       <ProductSearch/>
    </>
  );
}
