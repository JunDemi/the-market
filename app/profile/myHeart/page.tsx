import { Metadata } from "next";
import "@/asset/main.scss";
import MyHeartList from "@/components/profile-components/MyHeartList";
export const metadata: Metadata = {
  title: "찜 목록",
};

export default function MyHeart() {
  return (
    <>
       <MyHeartList/>
    </>
  );
}
