import { Metadata } from "next";
import "@/asset/main.scss";
import  SellList from "@/components/profile-components/SellList";
export const metadata: Metadata = {
  title: "판매내역",
};

export default function BuyPage() {
  return (
    <>
       <SellList/>
    </>
  );
}
