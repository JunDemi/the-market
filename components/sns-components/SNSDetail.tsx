import { AuthContext } from "@/app/lib/AuthProvider";
import {
  deleteSNS,
  deleteSNSComment,
  getMyProfile,
  getSNSDetail,
} from "@/services/firebaseCRUD";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import SNSComment from "./SNSComment";
import { useRecoilState } from "recoil";
import { isDeleteSNS, snsHeartState } from "@/app/atom";
import { IMyProfile, ISNSList } from "@/services/type";
//framer motomion variants
const boxVar = {
  entry: (isBack: boolean) => ({
    x: isBack ? -550 : 550,
  }),
  center: {
    //불러온 사진의 위치는 x: 0
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  hide: (isBack: boolean) => ({
    x: isBack ? 550 : -550,
    transition: {
      duration: 0.4,
    },
  }),
};
//스타일 컴포넌트
const DetailContainer = styled.div`
  width: 65rem;
  background-color: white;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const PostSlide = styled.div`
  position: relative;
  background-color: black;
  overflow: hidden;
  width: 550px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PostSlider = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
`;
const PostSlideItems = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const SliderButtons = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  width: 550px;
  padding: 0 0.5rem;
  justify-content: space-between;
  svg {
    cursor: pointer;
    width: 3rem;
    height: 4rem;
    stroke: rgba(255, 255, 255, 0.7);
    transition: all.3s;
    &:hover {
      scale: 1.05;
      stroke: #fff;
    }
  }
`;
const SliderRadios = styled.div`
  bottom: 1rem;
  z-index: 1;
  position: absolute;
  display: flex;
  width: 550px;
  padding: 0 1rem;
  justify-content: center;
  gap: 10px;
  button {
    cursor: pointer;
    border: 0.5px solid rgba(173, 173, 173, 0.7);
    padding: 4px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    transition: all.2s;
    &:hover {
      background-color: #fff;
    }
  }
`;
const CommentContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const PostHead = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 12px;
  padding: 1rem;
  border-bottom: 1px solid #d7d7d7;
  span {
    background-size: cover;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

const DeleteSNS = styled.button`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  left: 1rem;
  border: none;
  font-size: 12px;
  color: white;
  border-radius: 30px;
  background-color: #f76363;
  padding: 5px 1.2rem;
`;
//스타일 컴포넌트
export default function SNSDetail({ snsId }: { snsId: string }) {
  const [snsHeart, set_snsHeart] = useRecoilState(snsHeartState); //전달된 좋아요 신호 리코일
  const [, set_close] = useRecoilState(isDeleteSNS); //sns삭제 시 리코일 신호를 전송하여 오버레이 닫기
  const {
    isLoading,
    data: sdData,
    refetch,
  } = useQuery<ISNSList>(["sns_detail", snsId], () => getSNSDetail(snsId));
  const { user }: any = AuthContext();
  const [userData, set_userData] = useState<IMyProfile[]>();
  const [back, set_back] = useState(false); //현재 사진이 불러올 사진보다 뒤에 있는지 앞에 있는지 판가름
  const [currentPage, set_currentPage] = useState(0); //number형태의 state값. 각 사진의 위치를 숫자로 저장한다.
  const nextCard = (imgLength: number) => {
    //다음 버튼 클릭
    set_currentPage((prev) =>
      prev === imgLength - 1 ? imgLength - 1 : prev + 1
    ); //다음 숫자로 변경하여 페이지 넘김. 가장 끝일 경우 동작하지 않도록, 개수는 0부터 시작하지 않으므르 -1

    set_back(false);
  };
  const prevCard = () => {
    //이전 버튼 클릭
    set_currentPage((prev) => (prev === 0 ? 0 : prev - 1)); //이전 숫자로 변경하여 페이지 넘김. 0일 경우 동작하지 않도록
    set_back(true);
  };
  const currentPageSet = (current: number) => {
    if (currentPage > current) {
      set_back(true);
    } else if (currentPage < current) {
      set_back(false);
    }
    set_currentPage(current);
  };

  //프로필 사진이 디폴트인지 커스텀인지
  useEffect(() => {
    getMyProfile(sdData?.snsInfo.userId)
      .then((response) => set_userData(response))
      .catch((error) => console.log(error.message));
  }, [sdData]);
  useEffect(()=>{
    if(snsHeart === "clicked"){
      refetch();
      set_snsHeart("");
    }
  },[snsHeart]);
  //게시물 삭제
  const onDeleteSNS = async (snsId: string) => {
    await deleteSNSComment(undefined ,snsId);
    await deleteSNS(snsId);
    set_close("close");
  };
  return (
    <>
      {!isLoading && sdData && userData && user.isLogin ? (
        <DetailContainer>
          <PostSlide>
            {user.user.uid === sdData.snsInfo.userId && (
              <DeleteSNS
                className="material-btn"
                onClick={() => onDeleteSNS(snsId)}
              >
                삭제
              </DeleteSNS>
            )}
            <PostSlider>
              <AnimatePresence mode="sync" custom={back}>
                {sdData.snsInfo.snsImageArray.map(
                  (i, number) =>
                    number === currentPage && (
                      <PostSlideItems
                        key={number}
                        custom={back}
                        variants={boxVar}
                        initial="entry"
                        animate="center"
                        exit="hide"
                        src={i}
                      />
                    )
                )}
              </AnimatePresence>
            </PostSlider>
            <SliderButtons>
              <svg
                style={currentPage === 0 ? { opacity: 0 } : {}}
                onClick={prevCard}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>

              <svg
                style={
                  currentPage === sdData.snsInfo.snsImageArray.length - 1
                    ? { opacity: 0 }
                    : {}
                }
                onClick={() => nextCard(sdData.snsInfo.snsImageArray.length)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </SliderButtons>
            <SliderRadios>
              {sdData.snsInfo.snsImageArray.map((data, current) => (
                <button
                  key={current}
                  onClick={() => currentPageSet(current)}
                  style={
                    currentPage === current
                      ? { backgroundColor: "#4ebbf5" }
                      : {}
                  }
                />
              ))}
            </SliderRadios>
          </PostSlide>
          <CommentContainer>
            <PostHead>
              <span
                style={
                  userData[0].profileInfo.profileImg === "default"
                    ? {
                        backgroundImage: `url('/defaultProfile.webp')`,
                      }
                    : {
                        backgroundImage: `url('${userData[0].profileInfo.profileImg}')`,
                      }
                }
              />
              <h3>{sdData.snsInfo.userEmail}</h3>
            </PostHead>
            <SNSComment
              snsId={snsId}
              userId={user.user.uid}
              userEmail={user.user.email}
              writerData={sdData}
              writerImg={userData[0].profileInfo.profileImg}
            />
          </CommentContainer>
        </DetailContainer>
      ) : null}
    </>
  );
}
