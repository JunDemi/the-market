import CreateProduct from "@/components/market-components/CreateProduct";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "상품등록",
};

export default function MarketWrite() {
  return (
    <>
      <CreateProduct/>
    </>
  );
}
