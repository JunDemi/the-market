"use client";
import Dashboard from "@/components/dashboard/DashBoard";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  return (
    <>
    <DashboardContainer>
      <Dashboard />
    </DashboardContainer>
    </>
  );
}
