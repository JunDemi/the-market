"use client";
import { usePathname } from "next/navigation";
import UserSearchPage from "./UserSearchPage";

export default function UserSearch() {
  const pathname = usePathname();
  const keyword = decodeURIComponent(pathname).split("/").pop();
  return (
    <>
        <UserSearchPage userId={keyword} />
    </>
  );
}
