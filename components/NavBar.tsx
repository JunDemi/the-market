'use client'
import "../asset/main.scss";
import styled from "styled-components";
//스타일 컴포넌트 시작
const NavContainer = styled.div`
    background-color: red;
    height: 100dvh;
    &:hover{
      padding: 0 20px 0 0;
    }
    transition: all.2s;
`;
//스타일 컴포넌트 끝
export default function NavBar() {
  
  return (
    <>
    <NavContainer>
        Hello
    </NavContainer>
    </>
  )
}
