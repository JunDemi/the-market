import "@/asset/main.scss";
import styled from "styled-components";
import TotalValues from "./TotalValues";
import DailySales from "./DailySales";
import TotalSales from "./TotalSales";
import BestBuyer from "./BestBuyer";
import BestSeller from "./BestSeller";
import BestHeart from "./BestHeart";

const ChartContainer = styled.div`
  display: grid;
  width: 70rem;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;
export default function Dashboard() {
  return (
    <>
      <ChartContainer>
        <TotalValues/>
        <DailySales/>
        <TotalSales/>
        <BestBuyer/>
        <BestSeller/>
        <BestHeart/>
      </ChartContainer>
    </>
  );
}
