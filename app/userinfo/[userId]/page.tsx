import UserSearch from "@/components/profile-components/UserSearch";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "사용자검색",
};

export const dynamic = 'force-dynamic'
export default function UserInfo() {
  return (
    <>
       <UserSearch/>
    </>
  );
}
