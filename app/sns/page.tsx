import { Metadata } from "next";
import "../../asset/main.scss";
import Image from "next/image";
import SNSLists from "@/components/sns-components/SNSLists";
export const metadata: Metadata = {
  title: "SNS",
};

export default function SNS() {
  return (
    <>
      <SNSLists/>
    </>
  );
}
