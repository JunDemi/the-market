"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import WriteButton from "../WriteButton";
//스타일 컴포넌트
const SearchBar = styled.div`
  //검색 창
  display: flex;
  justify-content: end;
  align-items: center;
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
const ProductList = styled.div`
  //검색 창 하단 리스트
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 5rem 3.5rem;
  align-items: center;
  row-gap: 5rem;
`;
const ProductItem = styled(motion.div)`
  //물품
  background-color: white;
  box-shadow: 3px 3px 4px 0 #7e7e7e;
  border-radius: 10px;
  width: 19.5rem;
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div:nth-child(1) {
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 12rem;
  }
  div:nth-child(2) {
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    h1 {
      font-weight: bold;
      font-size: 20px;
      letter-spacing: -0.06rem;
    }
    p {
      font-size: 13px;
      color: #797979;
    }
    h2 {
      font-size: 17px;
      color: orange;
    }
    span {
      text-align: right;
      button {
        cursor: pointer;
        background: none;
        border: none;
      }
    }
  }
`;
const GoDetailButton = styled(motion.button)`
  cursor: pointer;
  border: none;
  padding: 0.7rem;
  border-radius: 30px;
  color: white;
  font-size: 16px;
`;
//스타일 컴포넌트
export default function Products() {
    const [c, sc] = useState(false);
   const change = () => {
    sc(prev => !prev)
   }
  return (
    <>
      <SearchBar>
        <div>
          <input type="text" placeholder="물품을 검색해보세요" />
          <button>
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
        </div>
      </SearchBar>
      <ProductList>
        {[...Array(60)].map((data, number) => (
          <>
            <ProductItem
              key={number}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div
                style={{
                  backgroundImage:
                    "url('https://i.pcmag.com/imagery/roundups/01WOu4NbEnv3pJ54qp7j50k-16.fit_lim.size_1050x.jpg')",
                }}
              />
              <div>
                <h1>Samsung Galaxy S{number}</h1>
                <p>jungwook3176@gmail.com</p>
                <h2>20,000원</h2>
                <span>
                  <button onClick={change}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={c ? "#fc7676" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth="1.2"
                      stroke="#fc7676"
                      style={{ width: "2rem", height: "2rem" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                </span>
                <GoDetailButton
                  className="material-btn"
                  initial={{
                    background: "linear-gradient(90deg, #ffc965, #ff6106)",
                  }}
                  whileHover={{
                    background: "linear-gradient(90deg, #fad590, #ff8b48)",
                  }}
                >
                  정보 보기
                </GoDetailButton>
              </div>
            </ProductItem>
          </>
        ))}
      </ProductList>
      <WriteButton to="market"/>
    </>
  );
}
