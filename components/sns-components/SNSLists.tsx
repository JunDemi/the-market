"use client";

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import WriteButton from "../WriteButton";
import { useState } from "react";
//framer motomion variants
const boxVar = {
  //AnimatePresense에 custom을 boolean state값을 적용시켜 isBack이란 변수를 사용
  entry: (isBack: boolean) => ({
    //entry는 n번째 사진을 불러올때. isBack = 현재보다 뒤에 있는 사진일때 현재 사진을 -640만큼 이동
    x: isBack ? -640 : 640,
  }),
  center: {
    //불러온 사진의 위치는 x: 0
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  hide: (isBack: boolean) => ({
    //현재 있는 사진을 치우고 다른 사진을 불러올때 현재있는 사진의 동작 메소드, 불러올 사진이 현재 사진보다 앞에 있을때 현재 사진을 640만큼 이동
    x: isBack ? 640 : -640,
    transition: {
      duration: 0.4,
    },
  }),
};
//스타일 컴포넌트
const Post = styled.div`
  width: 40rem;
  margin: 1rem auto 3rem auto;
  background-color: white;
  box-shadow: 3px 3px 4px #787878;
`;
const PostHead = styled.div`
  background: linear-gradient(90deg, #f5ffff, #dcdbfc);
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 14px;
  padding: 1rem;
  span {
    background-image: url("/defaultProfile.webp");
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
const PostSlide = styled.div`
  position: relative;
  overflow: hidden;
  height: 400px;
`;
const PostSlideItems = styled(motion.img)`
  position: absolute;
  top: 0;
  width: 100%;
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
const SliderButtons = styled.div`
  z-index: 1;
  position: absolute;
  top: 43%;
  display: flex;
  width: 40rem;
  padding: 0 0.5rem;
  justify-content: space-between;
  svg{
    cursor: pointer;
    width: 3rem;
    height: 4rem;
    stroke: rgba(255, 255, 255, 0.7);
    transition: all.3s;
    &:hover{
      scale: 1.05;
      stroke: #fff;
    }
  }
`;
const SliderRadios = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 1rem;
  display: flex;
  width: 40rem;
  padding: 0 1rem;
  justify-content: center;
  gap: 10px;
  button{
    cursor: pointer;
    border: 0.5px solid rgba(173, 173, 173, 0.7);
    padding: 4px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    transition: all.2s;
    &:hover{
      background-color: #fff;
    }
  }
`;
//스타일 컴포넌트

const testData = [
  "https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/10_October/persians/Persian+Cat+Facts+History+Personality+and+Care+_+ASPCA+Pet+Health+Insurance+_+white+Persian+cat+resting+on+a+brown+sofa-min.jpg",
  "https://th-thumbnailer.cdn-si-edu.com/3RQHyIdF6cCdAPoVL1NOZzyMCxY=/1000x750/filters:no_upscale():focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg",
  "https://www.treehugger.com/thmb/lVPokQ36E6azVxk18F6Uo1sgFDw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-593450425-5176c57c7b77417f9dd01dfb43827e7b.jpg",
  "https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTk2ODc3MzMxMjI1MTI2MzI1/cats-speak.png",
  "https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782_640.jpg",
];

export default function SNSLists() {
  const [back, set_back] = useState(false); //현재 사진이 불러올 사진보다 뒤에 있는지 앞에 있는지 판가름
  const [visible, set_visible] = useState(0); //number형태의 state값. 각 사진의 위치를 숫자로 저장한다.

  const nextCard = () => {
    //다음 버튼 클릭
    set_visible((prev) =>
      prev === testData.length - 1 ? testData.length - 1 : prev + 1
    ); //다음 숫자로 변경하여 페이지 넘김. 가장 끝일 경우 동작하지 않도록, 개수는 0부터 시작하지 않으므르 -1
    set_back(false);
  };
  const prevCard = () => {
    //이전 버튼 클릭
    set_visible((prev) => (prev === 0 ? 0 : prev - 1)); //이전 숫자로 변경하여 페이지 넘김. 0일 경우 동작하지 않도록
    set_back(true);
  };
  const txt =
    "めっちゃ久々にしらのむぎゅー撮れた 🥹 めっちゃ久々にしらのむぎゅー撮れた 🥹";
  const visibleSet = (current: number) => {
    if (visible > current) {
      set_back(true);
    } else if (visible < current) {
      set_back(false);
    }
    set_visible(current);
  };
  return (
    <>
      <Post>
        <PostHead>
          <span />
          <h3>jungwook3176@gmail.com</h3>
          <h4>&nbsp;•&nbsp;2023-12-12 ( 3시 32분 )</h4>
        </PostHead>
        <PostSlide>
          <AnimatePresence mode="sync" custom={back}>
            {testData.map(
              (i, number) =>
                number === visible && (
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
          <SliderButtons>
            <svg
            style={visible === 0 ? {opacity: 0} : {}}
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
              style={visible === testData.length - 1 ? {opacity: 0} : {}}
              onClick={nextCard}
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
            {testData.map((data, current) => (
              <>
              <button onClick={() => visibleSet(current)} style={visible === current ? {backgroundColor: "#4ebbf5"} : {}}/>
              </>
            ))}
          </SliderRadios>
        </PostSlide>
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
          <h4>좋아요 62개</h4>
        </PostHeart>
        <PostText
          rows={3}
          readOnly
          defaultValue={txt.length > 30 ? txt.slice(0, 30) + "....." : txt}
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
      <WriteButton to="sns" />
    </>
  );
}
