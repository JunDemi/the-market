"use client";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import WriteButton from "../WriteButton";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { readSNSList } from "@/services/firebaseCRUD";
import PostSlider from "./PostSlider";
import { getDateTimeFormat } from "@/services/getDay";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

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
//스타일 컴포넌트
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
    &:hover {
      stroke: #158ff3;
    }
  }
`;
const PostText = styled.textarea`
  border: none;
  width: 35rem;
  padding: 0 1.5rem;
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
//스타일 컴포넌트
export default function SNSLists() {
  const { ref, inView } = useInView();
  const {
    isLoading,
    data: snsData,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["sns_list"],
    queryFn: ({ pageParam = 1 }) => readSNSList(pageParam), //첫 페이지 당 4개의 데이터 -> DB호출에서 4를 곱할 예정
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
  return (
    <>
      {snsData?.pages[snsData.pages.length - 1].map((data: ISNSList) => (
        <Post key={data.snsId}>
          <PostSlider data={data} />
          <PostHeart>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
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
          <PostText
            rows={3}
            readOnly
            defaultValue={
              data.snsInfo.snsText.length > 30
                ? data.snsInfo.snsText.slice(0, 30) + "....."
                : data.snsInfo.snsText
            }
          />
          <PostComment>
            <p>댓글 300개</p>
            <motion.button
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
      ))}
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
            ""
          )
        ) : (
          <div style={{ height: "40px" }} />
        )}
      </InfiniteScrollDiv>
    </>
  );
}
