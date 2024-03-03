import { getBestHeart } from "@/services/filebaseDashboard";
import { EmailTotal, IHeart } from "@/services/type";
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
  h3 {
    margin-top: 4rem;
    font-size: 30px;
    color: #0c7df6;
  }
`;
//styled
export default function BestHeart() {
  const [heartData, set_heartData] = useState<IHeart[]>([]);
  const [heartList, set_heartList] = useState<EmailTotal[]>([]);
  useEffect(() => {
    getBestHeart().then((response) => set_heartData(response));
  }, []);
  useEffect(() => {
    set_heartList(refactoringArray(heartData));
  }, [heartData]);

  //동일한 이메일 주소를 가진 항목들의 heartCount를 합산하여 새로운 배열생성
  const refactoringArray = (array: any[]) => {
    const sumByEmail: EmailTotal[] = array.reduce(
      (result: EmailTotal[], item: IHeart) => {
        const existingItem = result.find((entry) => entry.email === item.email);
        if (existingItem) {
          existingItem.total += item.heartCount;
        } else {
          result.push({ email: item.email, total: item.heartCount });
        }
        return result;
      },
      []
    );
    return sumByEmail.sort((a, b) => b.total - a.total);
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
    colors: ["#ff00bb", "#f39494"],
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
      categories: heartList?.slice(0,5).map((name) => [name.email ?? ""]),
      labels: {
        formatter: function (val: number) {
          return Math.floor(val);
        },
      },
      axisBorder: {
        show: true,
        color: "#e2e2e2",
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
      name: "좋아요 개수",
      data: [
        heartList[0]?.total ?? 0,
        heartList[1]?.total ?? 0,
        heartList[2]?.total ?? 0,
        heartList[3]?.total ?? 0,
        heartList[4]?.total ?? 0,
      ],
    },
  ];
  return (
    <Container>
      <h1>베스트 좋아요</h1>
      <h2>SNS에서 좋아요를 가장 많이 받은 순</h2>
      <ApexChart
        type="bar"
        options={option}
        series={series}
        height={250}
        width={"100%"}
      />
    </Container>
  );
}
