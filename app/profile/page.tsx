import { Metadata } from "next";
import "@/asset/main.scss";
import DefaultProfile from "@/components/profile-components/DefaultProfile";
export const metadata: Metadata = {
  title: "내 프로필",
};

export default function Profile() {
  return (
    <div className="profile-container">
     <DefaultProfile/>
    </div>
  );
}
