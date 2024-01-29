import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import WriteButton from "../WriteButton";
import { productHeart, readProduct } from "@/services/firebaseCRUD";
import { useInfiniteQuery, useQuery } from "react-query";
import Image from "next/image";
import { AuthContext } from "@/app/lib/AuthProvider";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
interface IKeyword {
  keyword?: string | null;
}
//스타일 컴포넌트
const SearchBar = styled.div`
  //검색 창
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0 3.5rem;
  gap: 1rem;
  form,
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
const ReloadButton = styled(motion.button)`
  cursor: pointer;
  border: none;
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover svg {
    stroke: #868686;
  }
  svg {
    stroke: #5f5f5f;
    width: 1.5rem;
    height: 1.5rem;
  }
`;
const ProductList = styled.div`
  //검색 창 하단 리스트
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 5rem 2.5rem;
  align-items: center;
  row-gap: 5rem;
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
const InfiniteScrollDiv = styled.div`
margin: auto;
display: flex;
justify-content: center;
`;
//스타일 컴포넌트
export default function ProductsList({ keyword }: IKeyword) {
  const { user }: any = AuthContext();
  const [myHeart, set_myHeart] = useState(false);
  const router = useRouter();
  const { handleSubmit, register, reset } = useForm({ mode: "onSubmit" });
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
    queryFn: ({ pageParam = 1 }) => readProduct(pageParam, keyword), //첫 페이지 당 12개의 데이터 -> DB호출에서 12를 곱할 예정
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1 // 마지막 페이지가 될 때까지 / 1 * 12 -> 2 * 12 -> 3 * 12 ...
    }
  });
  //검색
  const productSearch = async (value: { keyword?: string | null }) => {
    router.push(`/market/${value.keyword}`);
    reset();
  };
  //찜하기
  const 찜하기 = async (productId: string, userId: string) => {
    set_myHeart(true);
    await productHeart(productId, userId);
    refetch();
    setInterval(() => {
      set_myHeart(false);
    }, 2500);
  };
  useEffect(()=> {
    if(inView && hasNextPage){
      fetchNextPage();
    }
  },[inView, hasNextPage, fetchNextPage]);
  return (
    <>
      {user.isLogin ? (
        <>
          <HeartPopup
            initial={{ opacity: 0 }}
            animate={myHeart ? { opacity: 1 } : { opacity: 0 }}
          >
            찜 목록에 추가되었습니다.
          </HeartPopup>
          <SearchBar>
            <form onSubmit={handleSubmit(productSearch)}>
              <input
                type="text"
                placeholder="물품을 검색해보세요"
                {...register("keyword", { required: true })}
                autoComplete="off"
              />
              <button type="submit">
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
            </form>
            <div>
              <ReloadButton
                whileTap={{ rotateZ: 300 }}
                transition={{ duration: 0.7 }}
                onClick={() => refetch()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </ReloadButton>
            </div>
          </SearchBar>

          {!isLoading ? (
            <>
              <ProductList>
                {pData?.pages[pData.pages.length - 1].map((data: IProduct,) =>
                      <ProductItem
                        key={data.productId}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div>
                          <Image
                            src={data.productInfo.productImg as string}
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
                                찜하기(data.productId, user.user.uid)
                              }
                              disabled={
                                user?.user.uid === data.productInfo.userId
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={
                                  data.productInfo.heart === user.user.uid
                                    ? "#fc7676"
                                    : "none"
                                }
                                viewBox="0 0 24 24"
                                strokeWidth="1.2"
                                stroke={
                                  data.productInfo.userId === user.user.uid
                                    ? "#bebebe"
                                    : "#fc7676"
                                }
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
                            href={
                              user?.user.uid === data.productInfo.userId
                                ? "/profile"
                                : `/market/detailPage/${data.productId}`
                            }
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
                              {user?.user.uid === data.productInfo.userId
                                ? "수정하기"
                                : "정보 보기"}
                            </GoDetailButton>
                          </Link>
                        </div>
                      </ProductItem>
                )}
              </ProductList>
              <WriteButton to="market" />

              <InfiniteScrollDiv ref={ref}>
                {isFetchingNextPage ? hasNextPage ? 
                <Image src="/loading.gif" alt="loading..." width={280} height={180}/>
                : "" : ""}
              </InfiniteScrollDiv>
            </>
          ) : (
            <div className="loading-gif">
              <Image
                src="/loading.gif"
                alt="로딩중..."
                width={450}
                height={300}
              />
            </div>
          )}
        </>
      ) : null}
    </>
  );
}
