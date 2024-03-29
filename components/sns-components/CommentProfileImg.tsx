import { getMyProfile } from "@/services/firebaseCRUD";
import { IMyProfile } from "@/services/type";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ProfileImg = styled.span`
  background-size: cover;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 1rem;
`;
export default function CommentProfileImg({ userId, imgProp }: { userId: string, imgProp: boolean }) {
  const [userImg, set_userImg] = useState<IMyProfile[]>();
  useEffect(() => {
    getMyProfile(userId)
      .then((response) => set_userImg(response))
      .catch((error) => console.log(error.message));
  }, [imgProp, userImg]);
  return (
    <>
      {userImg && (
        <ProfileImg
          style={
            userImg[0].profileInfo.profileImg === "default"
              ? {
                  backgroundImage: `url('/defaultProfile.webp')`,
                }
              : {
                  backgroundImage: `url('${userImg[0].profileInfo.profileImg}')`,
                }
          }
        />
      )}
    </>
  );
}
