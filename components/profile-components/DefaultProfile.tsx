"use client";
import { AuthContext } from "@/app/lib/AuthProvider";
import { getDateTimeFormat } from "@/services/getDay";
import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
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
  a {
    position: absolute;
    top: 2rem;
    right: 2rem;
    padding: 13px 1rem;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    background-color: white;
    font-size: 12px;
    color: #020254;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: #d7e6f2;
      color: #181893;
    }
  }
`;
const ProfileImage = styled.div`
  background-image: url("https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp");
  background-size: cover;
  background-repeat: no-repeat;
  width: 180px;
  height: 180px;
  border: 6px solid white;
  border-radius: 50%;
  box-shadow: 2px 2px 7px #787878;
`;
const ContentsTotal = styled.div`
  position: absolute;
  bottom: -3.5rem;
  padding: 2.5rem;
  background-color: white;
  box-shadow: 3px 3px 4px #898989;
  min-width: 40rem;
  border-radius: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  column-gap: 2.5rem;
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
const ContentsInfo = styled.div`
  margin: 7rem auto 2rem auto;
  width: 61rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2rem;
  div {
    padding: 5rem 0 2.5rem 0;
    text-align: center;
    background-color: white;
    border-radius: 13px;
    box-shadow: 3px 3px 4px #676767;
    position: relative;
    svg {
      width: 4rem;
      height: 4rem;
    }
    span {
      position: absolute;
      top: 1.5rem;
      left: 1rem;
      font-size: 13px;
      color: #838383;
    }
  }
`;
//스타일 컴포넌트
export default function DefaultProfile() {
  const { user }: any = AuthContext();
  return (
    <>
      {user?.isLogin ? (
        <>
          <ProfileInfoDiv>
            <ProfileImage />
            <h3>{user.user.email}</h3>
            <h4>
              가입일: {getDateTimeFormat(Number(user.user.metadata.createdAt))}
            </h4>
            <Link href="/profile" className="material-btn">
              비밀번호 변경
            </Link>

            <ContentsTotal>
              <div>
                <h4>13개</h4>
                <p>작성한 게시물</p>
              </div>
              <div>
                <h4>542,100원</h4>
                <p>총 구매액</p>
              </div>
              <div>
                <h4>1,300,250원</h4>
                <p>총 판매액</p>
              </div>
            </ContentsTotal>
          </ProfileInfoDiv>
          <ContentsInfo>
            <Link href="/profile">
              <motion.div
                whileHover={{ y: -5, backgroundColor: "whitesmoke" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#898989"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="#fff"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>

                <span>‹‹ 내가 쓴 글</span>
              </motion.div>
            </Link>
            <Link href="/profile">
              <motion.div
                whileHover={{ y: -5, backgroundColor: "whitesmoke" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#898989"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="#fff"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>

                <span>‹‹ 구매 내역</span>
              </motion.div>
            </Link>
            <Link href="/profile">
              <motion.div
                whileHover={{ y: -5, backgroundColor: "whitesmoke" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#898989"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="#fff"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>

                <span>‹‹ 판매 내역</span>
              </motion.div>
            </Link>
          </ContentsInfo>
        </>
      ) : null}
    </>
  );
}
