"use client";
import Image from "next/image";
import "../asset/main.scss";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Hamburger from "hamburger-react";
import { usePathname } from "next/navigation";
import Sign from "./auth-components/Sign";
import { useRecoilState } from "recoil";
import { signState } from "@/app/atom";
//스타일 컴포넌트 시작
const NavContainer = styled(motion.div)`
  overflow-x: hidden;
  height: 100%;
  padding: 2rem 0;
  background-image: url("https://wallpapers.com/images/hd/white-pattern-background-nnqjxiito1qd9475.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-shadow: 5px 0 5px -2px #7b7b7b;
  z-index: 10;
  hr {
    width: 70%;
    border: 0.5px solid #8d8d8d;
    margin: 1.5rem 0;
  }
`;
const Logo = styled.div`
  //로고 및 사이트이름
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  img {
    border: 2px solid #424242;
    border-radius: 100%;
  }
  p {
    color: #424242;
    letter-spacing: 0.1rem;
    font-size: 1.15rem;
    font-weight: 350;
  }
`;
const ToggleButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  bottom: 0;
`;
const MenuContainer = styled.div`
  //메뉴 버튼 컨테이너
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  a {
    div {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 1rem;
      padding: 0.7rem 1.5rem;
      transition: all.2s;
      border-radius: 5px;
      p {
        color: #565656;
        font-weight: 350;
        font-size: 14px;
      }

      svg {
        fill: #999999;
        stroke: #999999;
        stroke-width: 1px;
        width: 2rem;
        height: 2rem;
      }
    }
    &:hover {
      div {
        box-shadow: 0 3px 8px -3px gray;
        p {
          color: white;
        }
        svg {
          fill: white;
          stroke: white;
        }
      }
    }
    &:nth-child(1):hover div {
      background-color: #b52b2b;
    }
    &:nth-child(2):hover div {
      background-color: #36b733;
    }
    &:nth-child(3):hover div {
      background-color: #d7c659;
    }
    &:nth-child(4):hover div {
      background-color: #0ba3ea;
    }
  }
`;
const LoginDiv = styled.div` //로그인 관련 버튼 부분
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  position: absolute;
  bottom: 5rem;
  gap: 1rem;
  span {
    color: #565656;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    transition: all.2s;
    svg {
      fill: #999999;
      stroke: #999999;
      stroke-width: 2px;
      width: 1.5rem;
      height: 1.5rem;
      transition: all.2s;
    }
    &:hover{
      color: #818181;
      svg{
        fill: #bfbfbf;
        stroke: #bfbfbf;
      }
    }
  }
`;
const ModalOverlay = styled(motion.div)` //로그인 or 회원가입 창 오버레이
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.9);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//스타일 컴포넌트 끝
export default function NavBar() {
  const [toggle, set_toggle] = useState(true); //메뉴 크기 토글
  const [signModal, set_signModal] = useRecoilState<"login" | "register" | "off">(signState);
  const pathname = usePathname();

  const isLogin = false;
  
  return (
    <>
      <NavContainer
        initial={{ width: "20rem" }}
        animate={toggle ? { width: "20rem" } : { width: "7rem" }}
        transition={{ duration: 0.2 }}
      >
        <Link href="/">
          <Logo>
            <Image src="/logo.png" alt="" width={35} height={35} />

            <motion.p
              initial={{ display: "block", opacity: 1 }}
              animate={
                toggle
                  ? { display: "block", opacity: 1 }
                  : { display: "none", opacity: 0 }
              }
              transition={{ duration: 0.6 }}
            >
              THE MARKET
            </motion.p>
          </Logo>
        </Link>
        <hr />
        <MenuContainer>
          <Link href="/">
            <div
              className="material-btn"
              style={
                pathname === "/"
                  ? {
                    backgroundColor: "#b52b2b",
                    boxShadow: "0px 3px 8px -3px gray",
                  }
                  : {}
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={
                  pathname === "/" ? { fill: "white", stroke: "white" } : {}
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                />
              </svg>

              <motion.p
                initial={{ display: "block", opacity: 1, paddingRight: "3rem" }}
                animate={
                  toggle
                    ? { display: "block", opacity: 1, paddingRight: "2rem" }
                    : { display: "none", opacity: 0 }
                }
                transition={{ duration: 0.6 }}
                style={pathname === "/" ? { color: "white" } : {}}
              >
                Dashboard
              </motion.p>
            </div>
          </Link>
          <Link href="/market">
            <div
              className="material-btn"
              style={
                pathname === "/market"
                  ? {
                    backgroundColor: "#36b733",
                    boxShadow: "0px 3px 8px -3px gray",
                  }
                  : {}
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={
                  pathname === "/market"
                    ? { fill: "white", stroke: "white" }
                    : {}
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>

              <motion.p
                initial={{ display: "block", opacity: 1, paddingRight: "3rem" }}
                animate={
                  toggle
                    ? { display: "block", opacity: 1, paddingRight: "2rem" }
                    : { display: "none", opacity: 0 }
                }
                transition={{ duration: 0.6 }}
                style={pathname === "/market" ? { color: "white" } : {}}
              >
                Market
              </motion.p>
            </div>
          </Link>
          <Link href="/talk">
            <div
              className="material-btn"
              style={
                pathname === "/talk"
                  ? {
                    backgroundColor: "#d7c659",
                    boxShadow: "0px 3px 8px -3px gray",
                  }
                  : {}
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={
                  pathname === "/talk" ? { fill: "white", stroke: "white" } : {}
                }
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>

              <motion.p
                initial={{ display: "block", opacity: 1, paddingRight: "3rem" }}
                animate={
                  toggle
                    ? { display: "block", opacity: 1, paddingRight: "2rem" }
                    : { display: "none", opacity: 0 }
                }
                transition={{ duration: 0.6 }}
                style={pathname === "/talk" ? { color: "white" } : {}}
              >
                Chat
              </motion.p>
            </div>
          </Link>
          <Link href="/blog">
            <div
              className="material-btn"
              style={
                pathname === "/blog"
                  ? {
                    backgroundColor: "#0ba3ea",
                    boxShadow: "0px 3px 8px -3px gray",
                  }
                  : {}
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={
                  pathname === "/blog" ? { fill: "white", stroke: "white" } : {}
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>

              <motion.p
                initial={{ display: "block", opacity: 1, paddingRight: "3rem" }}
                animate={
                  toggle
                    ? { display: "block", opacity: 1, paddingRight: "2rem" }
                    : { display: "none", opacity: 0 }
                }
                transition={{ duration: 0.6 }}
                style={pathname === "/blog" ? { color: "white" } : {}}
              >
                Blog
              </motion.p>
            </div>
          </Link>
        </MenuContainer>
        <LoginDiv>
          {isLogin ?
            <>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>

                <motion.p
                  initial={{ display: "block", opacity: 1, paddingRight: "3rem" }}
                  animate={
                    toggle
                      ? { display: "block", opacity: 1, paddingRight: "2rem" }
                      : { display: "none", opacity: 0 }
                  }
                  transition={{ duration: 0.6 }}
                >
                  Sign Out
                </motion.p>
              </span>
            </>
            :
            <>
              <span onClick={() => set_signModal("login")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
                <motion.p
                  initial={{ display: "block", opacity: 1, paddingRight: "3rem" }}
                  animate={
                    toggle
                      ? { display: "block", opacity: 1, paddingRight: "2rem" }
                      : { display: "none", opacity: 0 }
                  }
                  transition={{ duration: 0.6 }}
                >
                  Sign In
                </motion.p>
              </span>
              <span onClick={() => set_signModal("register")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
                <motion.p
                  initial={{ display: "block", opacity: 1, paddingRight: "3rem" }}
                  animate={
                    toggle
                      ? { display: "block", opacity: 1, paddingRight: "2rem" }
                      : { display: "none", opacity: 0 }
                  }
                  transition={{ duration: 0.6 }}
                >
                  Sign Up
                </motion.p>
              </span>
            </>
          }

        </LoginDiv>
        <ToggleButton>
          <Hamburger
            size={25}
            color="#333333"
            toggled={toggle}
            rounded
            toggle={set_toggle}
            duration={0.6}
          />
        </ToggleButton>
      </NavContainer>
      {signModal !== "off" &&
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" style={{ width: "30px", height: "30px", cursor: "pointer" }} onClick={() => set_signModal("off")}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <Sign />
          </div>
        </ModalOverlay>
      }
    </>
  );
}
