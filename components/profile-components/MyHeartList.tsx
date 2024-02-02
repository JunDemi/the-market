'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { productHeart, readHeartProduct } from "@/services/firebaseCRUD";
import { useInfiniteQuery } from "react-query";
import Image from "next/image";
import { AuthContext } from "@/app/lib/AuthProvider";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface IProduct {
  productId: string;
  productInfo: {
    userId: string;
    userEmail: string;
    productName: string;
    productImg: string;
    productPrice: number;
    productDescription: number;
    createAt: number;
    updateAt: number;
    heart: string;
  };
}
//스타일 컴포넌트
const ProductList = styled.div`
  //검색 창 하단 리스트
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 2.5rem;
  align-items: center;
  row-gap: 5rem;
  h4{
    grid-column: span 3;
    color: #858585;
    font-size: 22px;
  }
`;
const ProductItem = styled(motion.div)`
  //물품
  background-color: white;
  box-shadow: 3px 3px 4px 0 #7e7e7e;
  border-radius: 10px;
  width: 19rem;
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div:nth-child(1) {
    position: relative;
    width: 100%;
    height: 13rem;
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
  width: 100%;
`;
const InfiniteScrollDiv = styled.div`
margin: auto;
display: flex;
justify-content: center;
`;
const HeartPopup = styled(motion.div)`
  position: fixed;
  z-index: 10;
  background-color: #373737;
  border-radius: 30px;
  padding: 10px;
  font-size: 13px;
  color: white;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%);
`;
//스타일 컴포넌트
export default function MyHeartList() {
  const { user }: any = AuthContext();
  const [myHeart, set_myHeart] = useState(false);
  const {ref, inView} = useInView();
  //상품 목록 불러오기
  const {
    isLoading,
    data: pData,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ["product_list"],
    queryFn: ({ pageParam = 1 }) => readHeartProduct(pageParam, user?.user.uid), //첫 페이지 당 12개의 데이터 -> DB호출에서 12를 곱할 예정
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1 // 마지막 페이지가 될 때까지 / 1 * 12 -> 2 * 12 -> 3 * 12 ...
    }
  });
  //찜하기
  const 찜하기 = async (productId: string, noHeart: "0") => {
    set_myHeart(true);
    await productHeart(productId, noHeart);
    refetch();
    setInterval(() => {
      set_myHeart(false);
    }, 2500);
  };
  useEffect(()=> { //ref에 닿으면 무한 스크롤 1회 작동
    if(inView && hasNextPage){
      fetchNextPage();
    }
  },[inView, hasNextPage, fetchNextPage]);
  return (
    <>
      {user.isLogin ? (
        <>
          {!isLoading ? (
            <>
            <HeartPopup
            initial={{ opacity: 0 }}
            animate={myHeart ? { opacity: 1 } : { opacity: 0 }}
          >
            찜 목록에서 제거되었습니다.
          </HeartPopup>
              <ProductList>
                <h4>내가 찜한 상품</h4>
                {pData?.pages[pData.pages.length - 1].map((data: IProduct,) =>
                      <ProductItem
                        key={data.productId}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div>
                          <Image
                            src={data.productInfo.productImg}
                            alt=""
                            width={0}
                            height={0}
                            fill
                          />
                        </div>
                        <div>
                          <h1>
                            {data.productInfo.productName.replace(
                              /\b\w/g,
                              (match) => match.toUpperCase()
                            )}
                          </h1>
                          <p>{data.productInfo.userEmail}</p>
                          <h2>
                            {Number(
                              data.productInfo.productPrice
                            ).toLocaleString()}
                            원
                          </h2>
                          <span>
                            <button
                              onClick={() =>
                                찜하기(data.productId, "0")
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#fc7676"
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
                          <Link
                            href={`/market/detailPage/${data.productId}`}
                          >
                            <GoDetailButton
                              className="material-btn"
                              initial={{
                                background:
                                  "linear-gradient(90deg, #ffc965, #ff6106)",
                              }}
                              whileHover={{
                                background:
                                  "linear-gradient(90deg, #fad590, #ff8b48)",
                              }}
                            >
                              정보 보기
                            </GoDetailButton>
                          </Link>
                        </div>
                      </ProductItem>
                )}
              </ProductList>
              <InfiniteScrollDiv ref={ref}>
                {isFetchingNextPage ? hasNextPage ? 
                <Image src="/loading2.gif" alt="loading..." width={60} height={60}/>
                : "" : <div style={{height: "40px"}}/> }
              </InfiniteScrollDiv>
            </>
          ) : (
            <div className="loading-gif">
              <Image
                src="/loading2.gif"
                alt="로딩중..."
                width={100}
                height={100}
              />
            </div>
          )}
        </>
      ) : null}
    </>
  );
}
