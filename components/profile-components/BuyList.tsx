"use client";

import Image from "next/image";
import styled from "styled-components";
import BuySellLinks from "./BuySellLinks";
import { useQuery } from "react-query";
import { AuthContext } from "@/app/lib/AuthProvider";
import { readBuyList } from "@/services/firebaseCRUD";
import { getDateTimeFormat } from "@/services/getDay";
import { useState } from "react";
import { motion } from "framer-motion";
import BuyDetail from "./BuyDetail";

interface IBuyData {
  buyId: string;
  buyInfo: {
    buyDate: string;
    buyerId: string;
    buyerEmail: string;
    productName: string;
    productPrice: number;
    productDescription: string;
    productImg: string;
    sellerId: string;
    sellerEmail: string;
  };
}
//스타일 컴포넌트
const TableHead = styled.div`
  margin: 2rem auto;
  background-color: white;
  padding: 1rem;
  box-shadow: 3px 3px 4px #898989;
  display: grid;
  width: 70rem;
  grid-template-columns: 6rem 14rem 15rem 15rem 8rem auto;
  text-align: center;
  font-size: 16px;
  div {
    padding: 2rem 0;
    &:last-child {
      position: relative;
      overflow: hidden;
    }
  }
`;
const TableBodyContainer = styled.div`
  overflow: hidden;
  box-shadow: 3px 3px 4px #898989;
  width: 70rem;
  margin: auto;
  background-color: white;
  hr {
    width: 67rem;
    border: none;
    border-bottom: 0.1px solid #cbcbcb;
    background: none;
    margin: 0 auto;
    &:first-child {
      display: none;
    }
  }
`;
const TableBody = styled(TableHead)`
  box-shadow: none;
  margin: 0 auto;
  font-size: 12px;
  transition: 0.2s;
  cursor: pointer;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6.5rem;
  }
  &:hover {
    background-color: #e5eefb;
  }
`;
const DetailOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const CloseButton = styled.div`
  width: 50rem;
  display: flex;
  justify-content: end;
  margin-bottom: 0.5rem;
  button{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 12px;
    font-size: 14px;
    border: none;
    border-radius: 30px;
    color: white;
    background: linear-gradient(90deg, #fa9740, #9c8f05);
    gap: 5px;
    cursor: pointer;
  }
`;
//스타일 컴포넌트
export default function BuyList() {
  const { user }: any = AuthContext();
  const [buyDetail, set_buyDetail] = useState(false); //상세 페이지 오버레이
  const [buyIdForDetail, set_buyIdForDetail] = useState("");
  //구매내역 불러오기
  const {
    isLoading,
    data: bData,
    refetch,
  } = useQuery<IBuyData[]>(
    ["buyList"],
    () => readBuyList("buy", user.user.uid),
    {
      staleTime: Infinity,
    }
  );
  const goBuyDetail = (buyId: string) => {
    set_buyDetail(true);
    set_buyIdForDetail(buyId);
  };
  return (
    <>
      {user.isLogin ? (
        <>
          <BuySellLinks />
          {bData ? (
            <>
              <TableHead>
                <div>거래일</div>
                <div>상품명</div>
                <div>구매자</div>
                <div>판매자</div>
                <div>가격 (원)</div>
                <div>사진</div>
              </TableHead>
              <TableBodyContainer>
                {bData.map((data) => (
                  <div key={data.buyId}>
                    <hr />
                    <TableBody onClick={() => goBuyDetail(data.buyId)}>
                      <div>
                        {String(
                          getDateTimeFormat(Number(data.buyInfo.buyDate))
                        ).substring(0, 10)}
                      </div>
                      <div>{data.buyInfo.productName}</div>
                      <div>{data.buyInfo.buyerEmail}</div>
                      <div>{data.buyInfo.sellerEmail}</div>
                      <div>
                        {Number(data.buyInfo.productPrice).toLocaleString()}
                      </div>
                      <div>
                        <Image
                          src={data.buyInfo.productImg}
                          alt=""
                          width={0}
                          height={0}
                          fill
                        />
                      </div>
                    </TableBody>
                  </div>
                ))}
              </TableBodyContainer>
              {buyDetail && (
                <DetailOverlay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CloseButton>
                    <button onClick={() => set_buyDetail(false)} className="material-btn">
                      close
                      <svg
                        onClick={() => set_buyDetail(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="white"
                        style={{
                          width: "1rem",
                          height: "1rem",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </CloseButton>
                  <BuyDetail buyId={buyIdForDetail} />
                </DetailOverlay>
              )}
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}