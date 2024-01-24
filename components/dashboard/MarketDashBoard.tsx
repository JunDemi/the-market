import "@/asset/main.scss";
import styled from "styled-components";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ChartContainer = styled.div`
  background-color: white;
  box-shadow: 5px 5px 10px 0 #7b7b7b;
  width: 25rem;
  padding: 2rem;
`;


export default function MarketDashBoard() {
  const option = {
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  }
  const series = [{
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }]
  return (
    <>
      <ChartContainer>
      <ApexChart type="line" options={option} series={series} height={200} width={500} />
      </ChartContainer>
    </>
  );
}
