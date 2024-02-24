"use client";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import WriteButton from "../WriteButton";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { readSNSList, updateSNSHeart } from "@/services/firebaseCRUD";
import PostSlider from "./PostSlider";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { AuthContext } from "@/app/lib/AuthProvider";
import SNSDetail from "./SNSDetail";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SNSCommentLength from "./SNSCommentLength";
import { useRecoilState } from "recoil";
import { isDeleteSNS } from "@/app/atom";

interface ISNSList {
  snsId: string;
  snsInfo: {
    userId: string;
    userEmail: string;
    snsImageArray: string[];
    snsText: string;
    snsHeart: string[];
    createAt: number;
    updateAt: number;
  };
}
interface IKeyword {
  keyword?: string;
}
//스타일 컴포넌트
const SearchBar = styled.div`
  //검색 창
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0 3.5rem;
  gap: 1rem;
  form,
  div {
    display: flex;
    justify-content: start;
    align-items: center;
    background-image: url("https://wallpapers.com/images/hd/white-pattern-background-nnqjxiito1qd9475.jpg");
    background-size: cover;
    box-shadow: 2px 2px 4px 0 #676767;
    padding: 0.3rem;
    border-radius: 5px;
    input {
      background: none;
      transition: all.2s;
      font-size: 15px;
      letter-spacing: -0.03rem;
      color: #555555;
      padding: 10px 10px;
      width: 8rem;
      border: none;
      &:focus {
        width: 13rem;
      }
    }
    button {
      cursor: pointer;
      padding: 0 0.5rem;
      border: none;
      background: none;
      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
`;
const ReloadButton = styled(motion.button)`
  cursor: pointer;
  border: none;
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover svg {
    stroke: #868686;
  }
  svg {
    stroke: #5f5f5f;
    width: 1.5rem;
    height: 1.5rem;
  }
`;
const Post = styled.div`
  width: 40rem;
  margin: 1rem auto 3rem auto;
  background-color: white;
  box-shadow: 3px 3px 4px #787878;
`;
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
const PostText = styled.p`
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  font-size: 15px;
`;
const PostComment = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  p {
    color: #848484;
    font-size: 14px;
  }
  button {
    border: none;
    padding: 5px 10px;
    border-radius: 30px;
    font-size: 13px;
    cursor: pointer;
  }
`;
const InfiniteScrollDiv = styled.div`
  margin: 5rem auto 0 auto;
  display: flex;
  justify-content: center;
`;
const SNSOverlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
`;
const CloseButton = styled.div`
  width: 65rem;
  display: flex;
  justify-content: end;
  margin-bottom: 0.5rem;
  svg {
    cursor: pointer;
  }
`;
//스타일 컴포넌트
export default function SNSLists({ keyword }: IKeyword) {
  const [close, set_close] = useRecoilState(isDeleteSNS); //sns삭제 시 리코일 신호를 전송하여 오버레이 닫기
  const { user }: any = AuthContext();
  const router = useRouter();
  const { ref, inView } = useInView();
  const [goOverlay, set_goOverlay] = useState<boolean>(false);
  const [moreData, set_moreData] = useState("");
  const { handleSubmit, register, reset } = useForm({ mode: "onSubmit" });
  const {
    isLoading,
    data: snsData,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["sns_list"],
    queryFn: ({ pageParam = 1 }) => readSNSList(pageParam, keyword), //첫 페이지 당 4개의 데이터 -> DB호출에서 4를 곱할 예정
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1; // 마지막 페이지가 될 때까지 / 1 * 4-> 2 * 4 -> 3 * 4 ...
    },
  });
  useEffect(() => {
    //ref에 닿으면 무한 스크롤 1회 작동
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  useEffect(() => {
    //게시물 삭제 시 오버레이 닫고 리패치
    if(close === "close"){
      set_goOverlay(false);
      refetch();
      set_close("");
    }
  },[goOverlay, close])
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
  const getOverlay = (snsId: string) => {
    set_goOverlay(true);
    set_moreData(snsId);
  };
   //검색
   const snsSearch = (value: {keyword?: string}) => {
    if(value.keyword){
      router.push(`/sns/${value.keyword}`);
      reset();
    }
  };
  return (
    <>
     <SearchBar>
            <form onSubmit={handleSubmit(snsSearch)}>
              <input
                type="text"
                placeholder="이메일을 검색해보세요"
                {...register("keyword", { required: true })}
                autoComplete="off"
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#676767"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </form>
            <div>
              <ReloadButton
                whileTap={{ rotateZ: 300 }}
                transition={{ duration: 0.7 }}
                onClick={() => refetch()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </ReloadButton>
            </div>
          </SearchBar>
          <div style={{margin: "2.5rem 0"}}/>
      {!isLoading && snsData && user.isLogin ? (
        <>
          {snsData.pages[snsData.pages.length - 1].map(
            (data: ISNSList, num: number) => (
              <div key={num}>
                <Post>
                  <PostSlider data={data} />
                  <PostHeart>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() =>
                        getHeart(
                          data.snsId,
                          data.snsInfo.userId,
                          user.user.uid,
                          data.snsInfo.snsHeart
                        )
                      }
                      fill={
                        data.snsInfo.snsHeart.indexOf(user.user.uid) !== -1
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

                    <h4>좋아요 {data.snsInfo.snsHeart.length}개</h4>
                  </PostHeart>
                  <PostText>
                    {data.snsInfo.snsText.length > 30 ? data.snsInfo.snsText.slice(0, 30) + "..." : data.snsInfo.snsText}
                  </PostText>
                  <PostComment>
                    <SNSCommentLength snsId={data.snsId} close={goOverlay}/>
                    <motion.button
                      onClick={() => getOverlay(data.snsId)}
                      className="material-btn"
                      initial={{
                        background: "linear-gradient(90deg, #d3fafa, #c7c5f8)",
                      }}
                      whileHover={{
                        background: "linear-gradient(90deg, #b8f9f9, #afadf8)",
                      }}
                    >
                      모두 보기
                    </motion.button>
                  </PostComment>
                </Post>
              </div>
            )
          )}
          <WriteButton to="sns" />
          <InfiniteScrollDiv ref={ref}>
            {isFetchingNextPage ? (
              hasNextPage ? (
                <Image
                  src="/loading2.gif"
                  alt="loading..."
                  width={60}
                  height={60}
                />
              ) : (
                <div className="loading-gif">
                  <Image
                    src="/loading2.gif"
                    alt="로딩중..."
                    width={100}
                    height={100}
                  />
                </div>
              )
            ) : (
              <div style={{ height: "40px" }} />
            )}
          </InfiniteScrollDiv>

          <AnimatePresence>
            {goOverlay ? (
              <>
                <SNSOverlay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CloseButton>
                    <svg
                      onClick={() => {
                        set_goOverlay(false);
                        refetch();
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      style={{
                        width: "2rem",
                        height: "2rem",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </CloseButton>
                  <SNSDetail snsId={moreData} />
                </SNSOverlay>
              </>
            ) : null}
          </AnimatePresence>
        </>
      ) : (
        <div className="loading-gif">
          <Image src="/loading2.gif" alt="로딩중..." width={100} height={100} />
        </div>
      )}
    </>
  );
}
