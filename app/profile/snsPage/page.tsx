import { Metadata } from "next";
import "@/asset/main.scss";
import MySNSList from "@/components/profile-components/MySNSList";
import MySNSPage from "@/components/profile-components/MySNSPage";
export const metadata: Metadata = {
  title: "내가쓴글",
};

export default function SNSPage() {
  return (
    <>
      <MySNSPage/>
    </>
  );
}
