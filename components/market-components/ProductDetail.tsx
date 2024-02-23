"use client";
import { motion } from "framer-motion";
import { AuthContext } from "@/app/lib/AuthProvider";
import { buyProduct, deleteProduct, productDetail, productHeart } from "@/services/firebaseCRUD";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { getDateTimeFormat } from "@/services/getDay";

interface IProductDetail {
  info: {
    userId: string;
    userEmail: string;
    productName: string;
    productImg: string;
    productPrice: number;
    productDescription: string;
    createAt: number;
    updateAt: number;
    heart: string;
  };
}
interface IBuyData {
  pName: string;
  pPrice: number;
  pImg: string;
  pDesc: string;
  buyerId: string;
  buyerEmail: string;
  sellerId: string;
  sellerEmail: string
}
//스타일 컴포넌트
const WriteTitle = styled.h1`
  margin: 2rem auto;
  font-size: 22px;
  letter-spacing: -0.06rem;
  color: #858585;
  width: 45rem;
`;
const WriteContainer = styled.div`
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("/white-pattern-background-nnqjxiito1qd9475.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  width: 45rem;
  margin: 1rem auto;
  div {
    &:nth-child(1) {
      position: relative;
      width: 100%;
      height: 28rem;
      margin: 0 auto;
      overflow: hidden;
    }
    &:nth-child(2) {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      p:nth-child(1) {
        font-size: 12px;
        color: #909090;
      }
      a {
        margin-top: 10px;
        text-align: left;
        span {
          font-size: 16px;
          font-weight: bold;
          color: white;
          border-radius: 30px;
          padding: 3px 0.7rem;
        }
      }
      hr {
        border: none;
        border-bottom: 0.5px solid #d1d1d1;
        width: 100%;
      }
      h1 {
        font-size: 40px;
        margin: 20px 0 30px 0;
        letter-spacing: 0.05rem;
      }
      h3 {
        color: #f47200;
        font-size: 25px;
      }
      h4 {
        margin: 5rem 0 0 0;
        font-size: 14px;
        color: #909090;
      }
      textarea {
        border: 1px solid #d1d1d1;
        background: none;
        height: 20rem;
        padding: 1rem;
        font-size: 15px;
      }
    }
  }
`;
const ButtonContainer = styled.div`
  width: 45rem;
  margin: auto;
  display: flex;
  justify-content: start;
  align-items: center;
  button {
    cursor: pointer;
    width: 10rem;
    padding-left: 1rem;
    height: 2.5rem;
    margin-right: 20px;
    border-radius: 30px;
    border: none;
    color: white;
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
  }
`;
//스타일 컴포넌트
export default function ProductDetail() {
  const { user }: any = AuthContext();
  const pathname = usePathname();
  const router = useRouter();
  const keyword = decodeURIComponent(pathname).split("/").pop();
  const [detailData, set_detailData] = useState<IProductDetail>();
  const [heart, setHeart] = useState(false);
  const [isLoading, set_isLoading] = useState(false);

  useEffect(() => {
    //pathname = 문서ID를 가진 데이터 불러오기
    productDetail(keyword)
      .then((response) => set_detailData(response))
      .catch((error) => console.log(error.message));
  }, [keyword, heart]);

  const 찜하기 = async () => {
    set_isLoading(true);
    if (!heart) {
      await productHeart(keyword, user?.user.uid);
      setHeart(true);
    } else {
      await productHeart(keyword, "0");
      setHeart(false);
    }
    set_isLoading(false);
  };

  const 구매하기 = async (buyData:IBuyData) => {
    set_isLoading(true);
    await buyProduct(buyData);
    await deleteProduct(keyword); //구매를 하여 상품목록에 제거
    set_isLoading(false);
    router.push('/profile/buyPage');
  };
  return (
    <>
      {user?.isLogin ? (
        <>
          <WriteTitle>상품 정보</WriteTitle>
          {detailData && (
            <>
              <WriteContainer>
                <>
                  <div>
                    <Image
                      src={String(detailData.info.productImg)}
                      alt=""
                      width={0}
                      height={0}
                      fill
                    />
                  </div>
                  <div>
                    <p>
                      작성일: {getDateTimeFormat(detailData.info.createAt)}
                      &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp; 최근수정일:{" "}
                      {getDateTimeFormat(detailData.info.updateAt)}
                    </p>
                    <Link href={`/userinfo/${detailData.info.userId}`}>
                      <motion.span
                        initial={{
                          background:
                            "linear-gradient(90deg, #ffc965, #ff6106)",
                        }}
                        whileHover={{
                          background:
                            "linear-gradient(90deg, #90f6fa, #4876ff)",
                        }}
                      >
                        {detailData?.info.userEmail}
                      </motion.span>
                    </Link>
                    <hr />
                    <h1>
                      {detailData?.info.productName.replace(/\b\w/g, (match) =>
                        match.toUpperCase()
                      )}
                    </h1>
                    <h3>
                      ₩{Number(detailData.info.productPrice).toLocaleString()}
                    </h3>
                    <h4>상품 설명</h4>

                    <textarea
                      readOnly
                      value={String(detailData.info.productDescription)}
                    />
                  </div>
                </>
              </WriteContainer>
              <ButtonContainer>
                <>
                  <button
                    className={
                      detailData?.info.heart === user.user.uid
                        ? "heart-already-btn material-btn"
                        : "heart-basic-btn material-btn"
                    }
                    onClick={() => 찜하기()}
                    disabled={isLoading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      strokeWidth="1.2"
                      stroke="white"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    {detailData?.info.heart === user.user.uid
                      ? "찜하기 완료"
                      : "찜 목록에 추가"}
                  </button>
                  <button
                    className="buy-btn material-btn"
                    disabled={isLoading}
                    onClick={() =>
                      구매하기({
                        pName: detailData.info.productName,
                        pPrice: detailData.info.productPrice,
                        pImg: detailData.info.productImg,
                        pDesc: detailData.info.productDescription,
                        buyerId: user.user.uid,
                        buyerEmail: user.user.email,
                        sellerId: detailData.info.userId,
                        sellerEmail: detailData.info.userEmail
                      }
                       
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      strokeWidth="1.2"
                      stroke="white"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    구매하기
                  </button>
                </>
              </ButtonContainer>
            </>
          )}
        </>
      ) : (
        <div className="loading-gif">
          <Image src="/loading2.gif" alt="로딩중..." width={100} height={100} />
        </div>
      )}
    </>
  );
}
