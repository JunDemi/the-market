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
export default function DonutChart() {
  const option = {
      chart: {
        type: 'donut' as 'donut',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      title: {
        text: "콘텐츠 사용 횟수",
        align: "left" as "left",
        style: {
          color: "#6d6d6d",
          fontWeight: "thin",
          fontSize: "14px",
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false
        }
      },
      labels: ["마켓", "채팅", "블로그"],
      dataLabels: {
        style: {
          fontWeight: "thin",
          fontSize: "10px"
        },
        dropShadow: {
          enabled: false
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 600
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
  }
  const series = [44, 55, 41]
  return (
    <>
      <ChartContainer>
      <ApexChart type="donut" options={option} series={series} height={250} width={"100%"} />
      </ChartContainer>
    </>
  );
}
