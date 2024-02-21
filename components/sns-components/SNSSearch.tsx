'use client';
import { usePathname } from "next/navigation";
import SNSLists from "./SNSLists";

export default function SNSSearch() {
  const pathname = usePathname();
  const keyword = decodeURIComponent(pathname).split("/").pop();
  return <>
  <SNSLists keyword={keyword}/>
  </>;
}
