import "@/asset/main.scss";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  background-color: white;
  box-shadow: 5px 5px 10px 0 #7b7b7b;
  width: 25rem;
  padding: 2rem;
`;

export default function MarketDashBoard() {
  return (
    <>
      <ChartContainer>
        <ApexChart
          series={[
            {
              name: "판매 수",
              data: [10, 41, 35, 69, 91, 148],
            },
          ]}
          options={{
            colors: ["#f4a3d4"],
            chart: {
              offsetY: 0,
              type: "line",
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
              curve: "monotoneCubic",
            },
            title: {
              text: "월별 판매 수",
              align: "left",
              style:{
                color: "#6d6d6d",
                fontWeight: "thin",
                fontSize: "14px"
              }
            },
            grid: {
              row: {
                colors: ["#fff"]
              },
            },
            xaxis: {
              categories: ["1월", "2월", "3월", "4월", "5월", "6월"],
              axisBorder: {
                show: false
              },
              axisTicks:{
                show: false
              }
            },
            yaxis:{
              min: 0,
              max: 150,
              tickAmount: 3
            }
            
          }}
        />
      </ChartContainer>
    </>
  );
}
