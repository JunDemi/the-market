import { buyDetail } from "@/services/firebaseCRUD";
import { getDateTimeFormat } from "@/services/getDay";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface IBuyDetail {
  info: {
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
const DetailContainer = styled.div`
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("/white-pattern-background-nnqjxiito1qd9475.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  width: 50rem;
  height: 80dvh;
  overflow-y: scroll;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  h1 {
    margin: 2rem 0 1rem 0;
    font-size: 30px;
  }
  h2 {
    margin: 1rem 0;
    color: #909090;
    font-size: 13px;
  }
  hr {
    border: none;
    border-bottom: 1px solid #bdbdbd;
    width: 100%;
    margin: 1rem 0;
  }
`;
const ImageContainer = styled.div`
  text-align: center;
`;
const DetailInfo = styled.div`
  margin: 2rem;
  width: 25rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 2rem;
  font-size: 14px;
  p {
    text-align: left;
    color: #787878;
  }
  h4 {
    margin-top: 1rem;
    text-align: left;
    color: black;
    font-size: 18px;
  }
  span {
    text-align: right;
  }
  h5 {
    margin-top: 1rem;
    text-align: right;
    color: red;
    font-size: 18px;
  }
`;
const Description = styled.div`
  margin: 1rem 0;
  p {
    margin: 1rem 0;
    color: #787878;
    font-size: 14px;
  }
  textarea {
    border: 1px solid #d1d1d1;
    background: none;
    height: 20rem;
    padding: 1rem;
    width: 40rem;
    font-size: 15px;
  }
`;
//스타일 컴포넌트
export default function BuyDetail({ buyId }: { buyId: string }) {
  const [detailData, set_detailData] = useState<IBuyDetail>();
  useEffect(() => {
    //pathname = 문서ID를 가진 데이터 불러오기
    buyDetail(buyId)
      .then((response) => set_detailData(response))
      .catch((error) => console.log(error.message));
  }, [buyId]);
  return (
    <>
      <DetailContainer>
        {detailData ? (
          <>
            <h1>{detailData.info.productName}</h1>
            <h2>구매ID: {buyId}</h2>
            <hr />

            <DetailInfo>
              <p>거래일</p>
              <span>{getDateTimeFormat(Number(detailData.info.buyDate))}</span>
              <p>판매자</p> <span>{detailData.info.sellerEmail}</span>
              <p>구매자</p> <span>{detailData.info.buyerEmail}</span>
              <h4>결제금액</h4>
              <h5>{Number(detailData.info.productPrice).toLocaleString()}원</h5>
            </DetailInfo>
            <ImageContainer>
              <Image
                src={detailData.info.productImg}
                alt=""
                width={450}
                height={280}
              />
            </ImageContainer>
            <Description>
              <p>상품설명</p>
              <textarea
                readOnly
                defaultValue={detailData.info.productDescription}
              ></textarea>
            </Description>
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
      </DetailContainer>
    </>
  );
}
