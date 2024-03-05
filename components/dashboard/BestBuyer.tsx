import { getBestBuyer } from "@/services/filebaseDashboard";
import { IBuyer } from "@/services/type";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
`;
//styled
export default function BestBuyer() {
  const [buyData, set_buyData] = useState<string[]>([]);
  const [buyerList, set_buyerList] = useState<IBuyer[]>([]);
  useEffect(() => {
    getBestBuyer("buy").then((response) => set_buyData(response));
  }, []);
  useEffect(() => {
    set_buyerList(refactoringArray(buyData));
  }, [buyData]);
  //각 단어의 등장 횟수를 세고, 그 횟수를 기준으로 내림차순으로 정렬한 뒤, 각 단어를 새로운 배열에 넣어주는 함수
  const refactoringArray = (array: string[]) => {
    const wordCount = array.reduce((count: any, array: any) => {
      count[array] = (count[array] || 0) + 1;
      return count;
    }, {});
    // 객체를 배열로 변환하고 등장 횟수를 기준으로 내림차순으로 정렬
    const sortedWords = Object.keys(wordCount).sort(
      (a, b) => wordCount[b] - wordCount[a]
    );
    // 정렬된 단어들과 각 단어의 등장 횟수를 포함한 객체 생성
    const resultArray: IBuyer[] = sortedWords.map((buyer) => ({
      buyer,
      count: wordCount[buyer],
    }));
    return resultArray;
  };
  const option: any = {
    chart: {
      offsetY: 0,
      type: "bar" as "bar",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      width: 150,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: "30%",
      },
    },
    colors: ["#00afef", "#ad68f2"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
        show: false,
    },
    xaxis: {
      categories: buyerList?.slice(0,7).map((name) => [name.buyer ?? ""]),
      labels: {
        formatter: function (val: number) {
          return Math.floor(val);
        },
      },
      axisBorder: {
        show: true,
        color:"#e2e2e2"
      },
      axisTicks: {
        show: false,
      },
      min: 0,
      tickAmount: 2,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + "개";
        },
      },
    },
  };
  const series = [
    {
      name: "구매 횟수",
      data: [
        buyerList[0]?.count ?? 0,
        buyerList[1]?.count ?? 0,
        buyerList[2]?.count ?? 0,
        buyerList[3]?.count ?? 0,
        buyerList[4]?.count ?? 0,
        buyerList[5]?.count ?? 0,
        buyerList[6]?.count ?? 0,
      ],
    },
  ];
  return (
    <>
      {buyerList && (
        <Container>
          <h1>베스트 바이어</h1>
          <h2>구매 횟수가 가장 많은 순</h2>
          <ApexChart
            type="bar"
            options={option}
            series={series}
            height={250}
            width={"100%"}
          />
        </Container>
      )}
    </>
  );
}
