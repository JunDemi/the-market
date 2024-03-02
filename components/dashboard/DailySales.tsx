import "@/asset/main.scss";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { getDateTimeFormat, getPastTime } from "@/services/getDay";
import { useEffect, useState } from "react";
import { getSales } from "@/services/filebaseDashboard";
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
//styled component
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ChartContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem 1rem 1rem 1rem;
  grid-column: span 2;
  h1{
    font-size: 16px;
    font-weight: bold;
  }
  h2 {
    font-size: 12px;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #787878;
  }
`;
//styled component
export default function DailySales() {
  const [oneDay, set_oneDay] = useState<number>(0);
  const [twoDay, set_twoDay] = useState<number>(0);
  const [threeDay, set_threeDay] = useState<number>(0);
  const [fourDay, set_fourDay] = useState<number>(0);
  const [fiveDay, set_fiveDay] = useState<number>(0);
  const [sixDay, set_sixDay] = useState<number>(0);

  const option = {
    colors: ["#2cb3f6"],
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
      curve: "smooth" as "smooth",
    },
    grid: {
      row: {
        colors: ["#fff"],
      },
    },
    xaxis: {
      categories: ["5일전", "4일전", "3일전", "2일전", "1일전", "오늘"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val + "원"
        }
      }
    }
  };
  const series = [
    {
      name: "매출액",
      data: [sixDay, fiveDay, fourDay, threeDay, twoDay, oneDay],
    },
  ];

  useEffect(() => {
    getSales(getPastTime("1일전"), getPastTime("오늘")).then((response) =>
      priceTotal(response, "oneDay")
    );
    getSales(getPastTime("2일전"), getPastTime("1일전")).then((response) =>
      priceTotal(response, "twoDay")
    );
    getSales(getPastTime("3일전"), getPastTime("2일전")).then((response) =>
      priceTotal(response, "threeDay")
    );
    getSales(getPastTime("4일전"), getPastTime("3일전")).then((response) =>
      priceTotal(response, "fourDay")
    );
    getSales(getPastTime("5일전"), getPastTime("4일전")).then((response) =>
      priceTotal(response, "fiveDay")
    );
    getSales(getPastTime("6일전"), getPastTime("5일전")).then((response) =>
      priceTotal(response, "sixDay")
    );
  }, []);
  //불러온 데이터들의 가격들만 뽑고 합산하는 함수
  const priceTotal = (data: ISale[] | undefined, day: string) => {
    if (data) {
      if (day === "oneDay") {
        const total = data.reduce(
          (acc, value) => acc + Number(value.productPrice),
          0
        );
        set_oneDay(total);
      } else if (day === "twoDay") {
        const total = data.reduce(
          (acc, value) => acc + Number(value.productPrice),
          0
        );
        set_twoDay(total);
      } else if (day === "threeDay") {
        const total = data.reduce(
          (acc, value) => acc + Number(value.productPrice),
          0
        );
        set_threeDay(total);
      } else if (day === "fourDay") {
        const total = data.reduce(
          (acc, value) => acc + Number(value.productPrice),
          0
        );
        set_fourDay(total);
      } else if (day === "fiveDay") {
        const total = data.reduce(
          (acc, value) => acc + Number(value.productPrice),
          0
        );
        set_fiveDay(total);
      } else if (day === "sixDay") {
        const total = data.reduce(
          (acc, value) => acc + Number(value.productPrice),
          0
        );
        set_sixDay(total);
      }
    }
  };
  return (
    <>
      <ChartContainer>
        <h1>일일 매출액</h1>
        <h2>현재 날짜: {getDateTimeFormat(Date.now())?.substring(0, 10)}</h2>
        <ApexChart
          type="area"
          options={option}
          series={series}
          height={250}
          width={"100%"}
        />
      </ChartContainer>
    </>
  );
}
