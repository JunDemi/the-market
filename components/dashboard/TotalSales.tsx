import { getSales } from "@/services/filebaseDashboard";
import { getDateTimeFormat, getPastTime } from "@/services/getDay";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CountUp from "react-countup";
interface ISale {
  buyDate: string;
  buyerId: string;
  buyerEmail: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImg: string;
  sellerId: string;
  sellerEmail: string;
}
//styled
const Container = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 10px;
  overflow: hidden;
  div{
    padding: 2rem 1rem;
  }
  h1 {
    font-size: 16px;
    font-weight: bold;
  }
  h2 {
    font-size: 12px;
    margin-top: 1.5rem;
    color: #787878;
  }
  h3 {
    margin-top: 4rem;
    font-size: 30px;
    color: #0c7df6;
  }
  hr {
    margin-top: 3rem;
  }
`;
//styled
export default function TotalSales() {
  const [totalData, set_totalData] = useState<ISale[]>([]);
  const [yesterdayTotal, set_yesterdayTotal] = useState<ISale[]>([]);
  useEffect(() => {
    getSales().then((response) => set_totalData(response));
    getSales(1, getPastTime("1일전")).then((response) => set_yesterdayTotal(response));
  }, []);
  const priceTotal = totalData.reduce(
    (acc, value) => acc + Number(value.productPrice),
    0
  );
  const yesterdayPriceTotal = yesterdayTotal.reduce(
    (acc, value) => acc + Number(value.productPrice),
    0
  );
  //어제
  const now = new Date();
  now.setDate(now.getDate() - 1);
  return (
    <Container>
      <div>
        <h1>누적 매출액</h1>
        <h2>기준일: {getDateTimeFormat(Date.now())?.substring(0, 10)}</h2>
        <h3>
          <CountUp end={priceTotal} duration={1.2} />원
        </h3>
      </div>
      <div style={{borderTop: "0.5px solid #b8b8b8"}}>
        <h1>어제 누적 매출액</h1>
        <h2>기준일: {getDateTimeFormat(now.getTime())?.substring(0, 10)}</h2>
        <h3>
          <CountUp end={yesterdayPriceTotal} duration={1.2} />원
        </h3>
      </div>
    </Container>
  );
}
