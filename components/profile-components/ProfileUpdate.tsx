"use client";
import { AuthContext } from "@/app/lib/AuthProvider";
import { motion } from "framer-motion";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getMyProfile, updateProfile } from "@/services/firebaseCRUD";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { storage } from "@/services/firebase";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

interface IMyProfile {
  profileId: string;
  profileInfo: {
    userId: string;
    userEmail: string;
    profileImg: string;
  };
}
interface IUpdateImg {
  profileImg: any;
}
//스타일 컴포넌트
const ProfileInfoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border-radius: 10px;
  background: linear-gradient(45deg, #acd0ff, #f65cae);
  position: relative;
  button {
    border: none;
    cursor: pointer;
    transition: all.2s;
  }
`;
const ProfileImage = styled.label`
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px;
  border: 6px solid white;
  box-shadow: 2px 2px 7px #787878;
  position: relative;
  overflow: hidden;
  transition: all.3s;
  margin-bottom: 2rem;
  cursor: pointer;
  &:hover {
    border-color: #393939;
    scale: 0.97;
  }
`;
const PreviewImage = styled.img`
  height: 24rem;
`;
const DefaultImageButton = styled.button`
  cursor: pointer;
  padding: 1rem 2rem;
  background-color: #313131;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  &:hover {
    background-color: #616161;
  }
`;
const SaveButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 5px 20px;
  margin-top: 0;
  background-color: white;
  border-radius: 30px;
  font-size: 12px;
`;
//스타일 컴포넌트
export default function ProfileUpdate() {
  const router = useRouter();
  const { user }: any = AuthContext();
  const { isLoading, data: profile_userData } = useQuery<IMyProfile[]>(
    ["update_userProfile"],
    () => getMyProfile(user?.user.uid)
  );
  const [preview, set_preview] = useState<string | null>("default");
  const [loading, set_loading] = useState<boolean>(false);
  const getPreview = (files: any) => {
    //이미지 프리뷰 함수
    if (files !== undefined) {
      const reader = new FileReader();
      reader.onloadend = () => {
        set_preview(reader.result as string);
      };
      reader.readAsDataURL(files);
    } else {
      set_preview(null);
    }
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IUpdateImg>({ mode: "onSubmit" });

  const onValid = async ({
    //수정 메소드
    profileImg,
  }: IUpdateImg) => {
    set_loading(true); //로딩 시작
    if (profileImg[0] && profile_userData) {
      const imageRef = ref(
        //이미지 파일이름: 유저ID + 랜덤조합텍스트 + 파일이름
        storage,
        `profile-image/${user.user.uid + uuid() + profileImg[0].name}`
      );
      const imgSnap = await uploadBytes(imageRef, profileImg[0]); //파이어 스토리지에 이미지 업로드
      const imgpath = await getDownloadURL(imgSnap.ref); //생성된 이미지 파일 링크를 변수에 저장
      await updateProfile(imgpath, profile_userData[0].profileId);
    } else {
      alert("프로필 사진이 변경되지 않았습니다.");
    }
    set_loading(false);
    router.push("/profile");
  };
  const setDefaultImg = async () => {
    set_loading(true);
    if (profile_userData) {
      await updateProfile("default", profile_userData[0].profileId);
    set_loading(false);
      router.push("/profile");
    }
  };
  return (
    <>
      {user?.isLogin && profile_userData ? (
        <>
          <form onSubmit={handleSubmit(onValid)}>
            <ProfileInfoDiv>
              <ProfileImage htmlFor="profileImage">
                {preview ? (
                  preview === "default" ? (
                    <PreviewImage
                      src={
                        profile_userData[0].profileInfo.profileImg === "default"
                          ? "/defaultProfile.webp"
                          : profile_userData[0].profileInfo.profileImg
                      }
                      alt=""
                    />
                  ) : (
                    <PreviewImage src={preview as string} alt="" />
                  )
                ) : (
                  <PreviewImage
                    src={
                      profile_userData[0].profileInfo.profileImg === "default"
                        ? "/defaultProfile.webp"
                        : profile_userData[0].profileInfo.profileImg
                    }
                    alt=""
                  />
                )}

                <input
                  type="file"
                  style={{ opacity: 0, position: "absolute", top: "0" }}
                  id="profileImage"
                  accept="image/*"
                  {...register("profileImg", { required: false })}
                  onChange={({ target }: any) => {
                    if (target === undefined) getPreview(null);
                    if (target) getPreview(target.files[0]);
                  }}
                />
              </ProfileImage>
              <DefaultImageButton className="material-btn" onClick={setDefaultImg} disabled={loading}>
                기본 이미지로 변경
              </DefaultImageButton>
              <SaveButton
                className="material-btn"
                type="submit"
                disabled={loading}
              >
                프로필 저장
              </SaveButton>
            </ProfileInfoDiv>
          </form>
        </>
      ) : null}
    </>
  );
}
