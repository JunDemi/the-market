import dynamic from "next/dynamic";
import styled from "styled-components";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
//styled
const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem 1rem 1rem 1rem; 
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
`;
//styled
export default function BestSeller() {
    const option = {
        colors: ["#c88914"],
        chart: {
          offsetY: 0,
          type: "bar" as "bar",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          width: 150
        },
        plotOptions: {
            bar: {
              horizontal: true,
              
            }
          },
        dataLabels: {
          enabled: false,
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
      };
      const series = [
        {
          name: "판매 수",
          data: [10, 41, 35, 69, 91, 148],
        },
      ];
  return <Container>
    <h1>베스트 셀러</h1>
    <h2>판매 수가 가장 많은 순</h2>
    <ApexChart
        type="bar"
        options={option}
        series={series}
        height={250}
        width={"100%"}
      />
  </Container>;
}
