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
export default function LineChart() {
  const option = {
    colors: ["#f4a3d4"],
    chart: {
      offsetY: 0,
      type: "line" as "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as "smooth"
    },
    title: {
      text: "월별 판매 수",
      align: "left" as "left",
      style: {
        color: "#6d6d6d",
        fontWeight: "thin",
        fontSize: "14px",
      },
    },
    grid: {
      row: {
        colors: ["#fff"],
      },
    },
    xaxis: {
      categories: ["1월", "2월", "3월", "4월", "5월", "6월"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 150,
      tickAmount: 3,
    },
  }
  const series = [{
    name: "판매 수",
    data: [10, 41, 35, 69, 91, 148],
  }]
  return (
    <>
      <ChartContainer>
      <ApexChart type="line" options={option} series={series} height={250} width={"100%"} />
      </ChartContainer>
    </>
  );
}
