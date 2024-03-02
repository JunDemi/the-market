import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
//Firestore 테이블 불러오기
const productsRef = collection(db, "product");
const buyRef = collection(db, "buy");
const snsRef = collection(db, "sns");
const snsCommentRef = collection(db, "snscomment");
/*--------------------------- 누적 콘텐츠 ---------------------------*/
export const getTotals = async () => {
  const resultArray: number[] = [];
  const productQuery = query(productsRef);
  const snsQuery = query(snsRef);
  const commentQuery = query(snsCommentRef);
  const buyQuery = query(buyRef); //조건 없는 쿼리 === select *

  const productResult = await getDocs(productQuery);
  resultArray.push(productResult.docs.length); //상품개수
  const snsResult = await getDocs(snsQuery);
  resultArray.push(snsResult.docs.length); //sns개수
  const commentResult = await getDocs(commentQuery);
  resultArray.push(commentResult.docs.length); //댓글 개수
  const buyResult = await getDocs(buyQuery);
  resultArray.push(buyResult.docs.length); //구매 개수

  return resultArray;
};
/*--------------------------- 누적 구매&판매액 ---------------------------*/
export const getSales = async (from?: number, to?: number) => {
  const resultArray: any[] = [];
  if (from && to) {
    //일일 매출액
    const buyQuery = query(
      buyRef,
      where("buyDate", ">", from),
      where("buyDate", "<", to)
    ); //from날짜부터 to날짜까지의 포함된 데이터들 불러오기
    const result = await getDocs(buyQuery);
    result.docs.map((data) => {
      resultArray.push(data.data());
    });
    return resultArray;
  } else {
    //전체 매출액
    const buyQuery = query(buyRef);
    const result = await getDocs(buyQuery);
    result.docs.map((data) => {
      resultArray.push(data.data());
    });
    return resultArray;
  }
};
/*--------------------------- 베스트 ---------------------------*/
export const getBestBuyer = async (type: "buy" | "sell") => {
  const resultArray: string[] = [];
  const buyQuery = query(buyRef);
  const result = await getDocs(buyQuery);
  if (type === "buy") { //구매자 리스트
    result.docs.map((data) => {
      resultArray.push(data.data().buyerEmail);
    });
  } else if (type === "sell") { //판매자 리스트
    result.docs.map((data) => {
      resultArray.push(data.data().sellerEmail);
    });
  }
  return resultArray;
};
