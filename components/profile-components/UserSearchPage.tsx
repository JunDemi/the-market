import { AuthContext } from "@/app/lib/AuthProvider";
import { getDateTimeFormat } from "@/services/getDay";
import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import ContentsTotal from "./ContentsTotal";
import { useQuery } from "react-query";
import { getMyProfile } from "@/services/firebaseCRUD";
import MySNSList from "./MySNSList";

interface IMyProfile {
  profileId: string;
  profileInfo: {
    userId: string;
    userEmail: string;
    profileImg: string;
  };
}
//스타일 컴포넌트
const ProfileInfoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0 6.5rem 0;
  background: linear-gradient(45deg, #ffedac, #369eff);
  position: relative;
  h3 {
    margin: 2rem 0;
    font-size: 18px;
  }
  h4 {
    font-size: 14px;
  }
`;
const ProfileImage = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  width: 180px;
  height: 180px;
  border: 6px solid white;
  border-radius: 50%;
  box-shadow: 2px 2px 7px #787878;
`;

//스타일 컴포넌트
export default function UserSearchPage({ userId }: { userId?: string }) {
  const { user }: any = AuthContext();
  const { isLoading, data: userData } = useQuery<IMyProfile[]>(
    ["my_userProfile"],
    () => getMyProfile(userId)
  );
  return (
    <>
      {user?.isLogin && userData ? (
        <>
          <ProfileInfoDiv>
            <ProfileImage
              style={{
                backgroundImage: `url('${
                  userData[0].profileInfo.profileImg === "default"
                    ? "/defaultProfile.webp"
                    : userData[0].profileInfo.profileImg
                }')`,
              }}
            />
            <h3>{user.user.email}</h3>
            <h4>
              가입일: {getDateTimeFormat(Number(user.user.metadata.createdAt))}
            </h4>
            <ContentsTotal userId={user.user.uid} />
          </ProfileInfoDiv>

          <MySNSList yourId={userId} />
        </>
      ) : null}
    </>
  );
}
