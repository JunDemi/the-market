import { AuthContext } from "@/app/lib/AuthProvider";
import {
  getMyProfile,
  getSNSDetail,
  updateSNSHeart,
} from "@/services/firebaseCRUD";
import { getDateTimeFormat } from "@/services/getDay";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
interface IUserProfile {
  profileId: string;
  profileInfo: {
    userId: string;
    userEmail: string;
    profileImg: string;
  };
}
interface ISNSList {
  info: {
    userId: string;
    userEmail: string;
    snsImageArray: string[];
    snsText: string;
    snsHeart: string[];
    createAt: number;
    updateAt: number;
  };
}
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
  font-size: 14px;
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
  h4 {
    color: #848484;
  }
`;
const Postinput = styled.div``;
const PostHeart = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  font-size: 13px;
  color: #616161;
  svg {
    cursor: pointer;
  }
`;
//스타일 컴포넌트
export default function SNSDetail({ snsId }: { snsId: string }) {
    const {isLoading, data:sdData, refetch} = useQuery<ISNSList>(
    ["sns_detail", snsId],
    () => getSNSDetail(snsId),
    );
  const { user }: any = AuthContext();
  const [userData, set_userData] = useState<IUserProfile[]>();
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
    getMyProfile(sdData?.info.userId)
      .then((response) => set_userData(response))
      .catch((error) => console.log(error.message));
  }, [sdData]);
  const getHeart = (
    snsId: string,
    snsUserId: string,
    myUserId: string,
    snsHeart: string[]
  ) => {
    //좋아요 (본인게시물이면 작동하지 않게)
    if (snsUserId === myUserId) {
      return;
    } else {
      if (snsHeart.indexOf(myUserId) !== -1) {
        //좋아요 한 사람 목록에 본인이 있으면 좋아요 삭제
        updateSNSHeart(snsId, myUserId, "-");
      } else {
        //좋아요 한 사람 목록에 본인이 없으면 좋아요 추가
        updateSNSHeart(snsId, myUserId, "+");
      }
      refetch();
    }
  };
  return (
    <>
      {!isLoading && sdData && userData && user.isLogin ? (
        <DetailContainer>
          <PostSlide>
            <PostSlider>
              <AnimatePresence mode="sync" custom={back}>
                {sdData.info.snsImageArray.map(
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
                  currentPage === sdData.info.snsImageArray.length - 1
                    ? { opacity: 0 }
                    : {}
                }
                onClick={() => nextCard(sdData.info.snsImageArray.length)}
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
              {sdData.info.snsImageArray.map((data, current) => (
                <>
                  <button
                    key={current}
                    onClick={() => currentPageSet(current)}
                    style={
                      currentPage === current
                        ? { backgroundColor: "#4ebbf5" }
                        : {}
                    }
                  />
                </>
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
              <h3>{sdData.info.userEmail}</h3>
              <h4>
                &nbsp;•&nbsp;
                {getDateTimeFormat(Number(sdData.info.createAt))}
              </h4>
            </PostHead>
            <Postinput>
              <PostHeart>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() =>
                    getHeart(
                      snsId,
                      sdData.info.userId,
                      user.user.uid,
                      sdData.info.snsHeart
                    )
                  }
                  fill={
                    sdData.info.snsHeart.indexOf(user.user.uid) !== -1
                      ? "#83c2f5"
                      : "none"
                  }
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#83c2f5"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>

                <h4>좋아요{sdData.info.snsHeart.length}개</h4>
              </PostHeart>
            </Postinput>
          </CommentContainer>
        </DetailContainer>
      ) : null}
    </>
  );
}
