import SNSSearch from "@/components/sns-components/SNSSearch";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "상품검색",
};

export const dynamic = 'force-dynamic'
export default function MarketSearch() {
  return (
    <>
       <SNSSearch/>
    </>
  );
}
