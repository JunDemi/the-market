import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
//타입

//상품 목록 불러오기
export const readProduct = async() => {
    const resultArray:any = [];
    const productsRef = collection(db, "product"); //product 테이블 불러오기
    const productQuery = query(productsRef, orderBy("updateAt", "desc")); //불러온 테이블 정렬을 위한 쿼리
    const result = await getDocs(productQuery); //문서화
    result.docs.map(data => {
        resultArray.push([data.id,data.data()]) //필드 고유의 id값과 필드 내용을 배열에 담기
    });
   return resultArray;
}