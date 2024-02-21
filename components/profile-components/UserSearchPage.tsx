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
const InfoContainer = styled.div`
  padding-bottom: 2rem;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("/white-pattern-background-nnqjxiito1qd9475.jpg");
`;
const ProfileInfoDiv = styled.div`
  background: linear-gradient(45deg, #ffedac, #369eff);
  padding: 2rem 0;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
  gap: 15rem;
  align-items: center;
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
  width: 400px;
  height: 400px;
  border: 6px solid white;
  border-radius: 50%;
  box-shadow: 2px 2px 7px #787878;
`;
const TotalDiv = styled.div`
  padding: 2.5rem;
  background-color: white;
  box-shadow: 3px 3px 4px #898989;
  border-radius: 15px;
  text-align: center;
  column-gap: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    h4 {
      font-weight: bold;
      font-size: 20px;
    }
    p {
      font-size: 14px;
      color: #949494;
    }
  }
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
          <InfoContainer>
            <ProfileInfoDiv>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ProfileImage
                  style={{
                    backgroundImage: `url('${
                      userData[0].profileInfo.profileImg === "default"
                        ? "/defaultProfile.webp"
                        : userData[0].profileInfo.profileImg
                    }')`,
                  }}
                />
                <h3>{userData[0].profileInfo.userEmail}</h3>
                <h4>
                  가입일:{" "}
                  {getDateTimeFormat(Number(user.user.metadata.createdAt))}
                </h4>
              </div>

              <TotalDiv>
                <ContentsTotal userId={user.user.uid} />
              </TotalDiv>
            </ProfileInfoDiv>

            <MySNSList yourId={userId} />
          </InfoContainer>
        </>
      ) : null}
    </>
  );
}
