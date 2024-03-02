import "@/asset/main.scss";
import styled from "styled-components";
import LineChart from "./LineChart";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import TotalValues from "./TotalValues";

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
        <LineChart/>
      </ChartContainer>
    </>
  );
}
