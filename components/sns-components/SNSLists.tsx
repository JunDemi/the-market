"use client";

import { motion } from "framer-motion";
import styled from "styled-components";
import WriteButton from "../WriteButton";
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
    background-image: url("https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp");
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
`;
const PostSlideItems = styled.img`
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
//스타일 컴포넌트
export default function SNSLists() {
    const txt = 'めっちゃ久々にしらのむぎゅー撮れた 🥹 めっちゃ久々にしらのむぎゅー撮れた 🥹';
  return (
    <>
      {[...Array(10)].map((data) => (
        <Post key={data}>
          <PostHead>
            <span />
            <h3>jungwook3176@gmail.com</h3>
            <h4>&nbsp;•&nbsp;2023-12-12 ( 3시 32분 )</h4>
          </PostHead>
          <PostSlide>
            <PostSlideItems src="https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/10_October/persians/Persian+Cat+Facts+History+Personality+and+Care+_+ASPCA+Pet+Health+Insurance+_+white+Persian+cat+resting+on+a+brown+sofa-min.jpg" />
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
            defaultValue={txt.length > 30 ? txt.slice(0, 30) + '.....' : txt}
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
    </>
  );
}
