'use client'

import "@/asset/main.scss";
import styled from "styled-components";
import LineChart from "./LineChart";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
`;

export default function Dashboard() {
  return (
    <>
      <ChartContainer>
        <LineChart/>
        <DonutChart/>
        <BarChart/>
        <AreaChart/>
      </ChartContainer>
    </>
  );
}
