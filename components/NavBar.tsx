"use client";
import Image from "next/image";
import "../asset/main.scss";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Hamburger from "hamburger-react";
import { usePathname } from "next/navigation";
//스타일 컴포넌트 시작
const NavContainer = styled(motion.div)`
  overflow-x: hidden;
  height: 100dvh;
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
        stroke-width: 1.5;
        width: 2rem;
        height: 2rem;
      }
    }
    &:hover {
      div {
        background-color: #b72f2f;
        box-shadow: 0 3px 8px -3px gray;
        p{
          color: white;
        }
        svg {
        fill: white;
        stroke: white;
      }
      }
    }
  }
`;
//스타일 컴포넌트 끝
export default function NavBar() {
  const [toggle, set_toggle] = useState(true);
  const pathname = usePathname();
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
          <Link href="/search">
            <div style={pathname === "/search" ? {backgroundColor: "#b72f2f", boxShadow: "0px 3px 8px -3px gray"} : {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={pathname === "/search" ? {fill: "white", stroke: "white"} : {}}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
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
                style={pathname === "/search" ? {color: "white", fontSize: "14px"} : {fontSize: "14px"}}
              >
                Dashboard
              </motion.p>
            </div>
          </Link>
          <Link href="/search">
            <div style={pathname === "/search" ? {backgroundColor: "#b72f2f", boxShadow: "0px 3px 8px -3px gray"} : {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={pathname === "/search" ? {fill: "white", stroke: "white"} : {}}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
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
                style={pathname === "/search" ? {color: "white"} : {}}
              >
                Dashboard
              </motion.p>
            </div>
          </Link>
          <Link href="/search">
            <div style={pathname === "/search" ? {backgroundColor: "#b72f2f", boxShadow: "0px 3px 8px -3px gray"} : {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={pathname === "/search" ? {fill: "white", stroke: "white"} : {}}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
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
                style={pathname === "/search" ? {color: "white", fontSize: "14px"} : {fontSize: "14px"}}
              >
                Dashboard
              </motion.p>
            </div>
          </Link>
          <Link href="/search">
            <div style={pathname === "/search" ? {backgroundColor: "#b72f2f", boxShadow: "0px 3px 8px -3px gray"} : {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={pathname === "/search" ? {fill: "white", stroke: "white"} : {}}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
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
                style={pathname === "/search" ? {color: "white", fontSize: "14px"} : {fontSize: "14px"}}
              >
                Dashboard
              </motion.p>
            </div>
          </Link>
        </MenuContainer>

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
    </>
  );
}
