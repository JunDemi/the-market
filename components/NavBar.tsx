
import Image from "next/image";
import "../asset/main.scss";
import styled from "styled-components";
import { useState } from "react";
import Hamburger from "hamburger-react";
//스타일 컴포넌트 시작
const NavContainer = styled.div`
  height: 100dvh;
  width: 19rem;
  transition: all.2s;
  background-image: url("https://wallpapers.com/images/hd/white-pattern-background-nnqjxiito1qd9475.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1.5rem 0;
  box-shadow: 5px 0 5px -2px #7b7b7b;
  z-index: 10;
  div:nth-child(2){ //로고 및 사이트이름
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img{
      border: 2px solid #424242;
      border-radius: 100%;
    }
    p{
      color: #424242;
      letter-spacing: 0.1rem;
      font-size: 1.15rem;
      font-weight: 350;
    }
  }
`;
//스타일 컴포넌트 끝
export default function NavBar() {
  const [toggleMenu, set_toggleMenu] = useState(false);
  return (
    <>
      <NavContainer>
        <div>
          <button>
            <Hamburger
              color="#ffffff"
              toggled={toggleMenu}
              rounded
              toggle={set_toggleMenu}
            />
          </button>

        </div>
        <div>
          <Image src="/logo.png" alt="" width={35} height={35}/>
          <p>THE MARKET</p>
        </div>
      </NavContainer>
    </>
  );
}
