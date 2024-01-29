"use client";
import { usePathname} from "next/navigation";
import ProductsList from "./ProductsList";

export default function ProductSearch() {
  const pathname = usePathname();
  const keyword = decodeURIComponent(pathname).split('/').pop();
 
  return (
    <>
     <ProductsList keyword={keyword}/>
    </>
  );
}
