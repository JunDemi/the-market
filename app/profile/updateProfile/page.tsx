import { Metadata } from "next";
import "@/asset/main.scss";
import ProfileUpdate from "@/components/profile-components/ProfileUpdate";
export const metadata: Metadata = {
  title: "프로필수정",
};

export default function UpdateProfile() {
  return (
    <>
        <ProfileUpdate />
    </>
  );
}
