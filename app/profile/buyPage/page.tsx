import { Metadata } from "next";
import "@/asset/main.scss";
import BuyList from "@/components/profile-components/BuyList";
export const metadata: Metadata = {
  title: "구매내역",
};

export default function BuyPage() {
  return (
    <>
       <BuyList/>
    </>
  );
}
