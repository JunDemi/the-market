import styled from "styled-components";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { readBuyList } from "@/services/firebaseCRUD";
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
interface ISellData {
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
//스타일 컴포넌트
const ContentsTotals = styled.div`
  position: absolute;
  bottom: -3.5rem;
  padding: 2.5rem;
  background-color: white;
  box-shadow: 3px 3px 4px #898989;
  min-width: 40rem;
  border-radius: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  column-gap: 2.5rem;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    h4 {
      font-weight: bold;
      font-size: 20px;
    }
    p {
      font-size: 14px;
      color: #949494;
    }
  }
`;
//스타일 컴포넌트
export default function ContentsTotal({ userId }: { userId: string }) {
  const [buyTotal, set_buyTotal] = useState<IBuyData[]>();
  const [sellTotal, set_sellTotal] = useState<ISellData[]>();
  useEffect(() => {
    readBuyList("buy", userId)
      .then((res) => set_buyTotal(res))
      .catch((error) => console.log(error.message));
    readBuyList("sell", userId)
      .then((res) => set_sellTotal(res))
      .catch((error) => console.log(error.message));
  }, [userId]);

  const total1 = buyTotal?.reduce( //총 구매액 계산
    (acc, data) => acc + Number(data.buyInfo.productPrice),
    0
  );
  const total2 = sellTotal?.reduce( //총 판매액 계산
    (acc, data) => acc + Number(data.sellInfo.productPrice),
    0
  );
  return (
    <ContentsTotals>
      {buyTotal && sellTotal ? (
        <>
          <div>
            <h4>
              <CountUp end={13} duration={1.2} />개
            </h4>
            <p>작성한 게시물</p>
          </div>
          <div>
            <h4>
              <CountUp end={Number(total1)} duration={1.2} />원
            </h4>
            <p>총 구매액</p>
          </div>
          <div>
            <h4>
              <CountUp end={Number(total2)} duration={1.2} />원
            </h4>
            <p>총 판매액</p>
          </div>
        </>
      ) : null}
    </ContentsTotals>
  );
}
