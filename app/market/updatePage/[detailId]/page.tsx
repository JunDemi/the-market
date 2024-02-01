import UpdateProduct from "@/components/market-components/UpdateProduct";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "상품수정",
};

export default function UpdateDetail() {
  return (
    <>
       <UpdateProduct />
    </>
  );
}
