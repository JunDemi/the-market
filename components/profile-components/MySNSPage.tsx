"use client";
import { AuthContext } from "@/app/lib/AuthProvider";
import MySNSList from "./MySNSList";

export default function MySNSPage() {
  const { user }: any = AuthContext();
  return (
    <>
    {user?.isLogin &&
    <MySNSList yourId={user.user.uid} />
    }
    </>
  );
}
