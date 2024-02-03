"use client";

import Image from "next/image";
import styled from "styled-components";
import BuySellLinks from "./BuySellLinks";
import { useQuery } from "react-query";
import { AuthContext } from "@/app/lib/AuthProvider";
import { readBuyList } from "@/services/firebaseCRUD";
import { getDateTimeFormat } from "@/services/getDay";

interface IBuyData {
  sellId: string;
  sellInfo: {
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
export default function SellList() {
  const { user }: any = AuthContext();

  const {
    isLoading,
    data: sData,
    refetch,
  } = useQuery<IBuyData[]>(
    ["sellList"],
    () => readBuyList("sell", user.user.uid),
    {
      staleTime: Infinity,
    }
  );
  return (
    <>
      {user.isLogin ? (
        <>
          <BuySellLinks />
          {sData ? (
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
                {sData.map((data) => (
                  <div key={data.sellId}>
                    <hr />
                    <TableBody>
                      <div>{String(getDateTimeFormat(Number(data.sellInfo.buyDate))).substring(0, 10)}</div>
                      <div>{data.sellInfo.productName}</div>
                      <div>{data.sellInfo.buyerEmail}</div>
                      <div>{data.sellInfo.sellerEmail}</div>
                      <div>{Number(data.sellInfo.productPrice).toLocaleString()}</div>
                      <div>
                        <Image
                          src={data.sellInfo.productImg}
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
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}
