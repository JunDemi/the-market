import CreateSNS from "@/components/sns-components/CreateSNS";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "게시물작성",
};

export default function SNSWrite() {
  return (
    <>
      <CreateSNS/>
    </>
  );
}
