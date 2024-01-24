'use client'

import "@/asset/main.scss";
import styled from "styled-components";
import MarketDashBoard from "./MarketDashBoard";

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
`;

export default function Dashboard() {
  return (
    <>
      <ChartContainer>
        <MarketDashBoard/>
      </ChartContainer>
    </>
  );
}
