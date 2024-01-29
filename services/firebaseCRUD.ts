import {
  collection,
  doc,
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

//상품 목록 불러오기
export const readProduct = async (pageParam: number, keyword?: string | null) => {
  const resultArray: any = [];
  if (keyword) { //검색을 했을 경우
    const productQuery = query(
      productsRef,
      where("heart", "==", "0"),
      orderBy("productName"),
      where("productName", ">=", keyword.toLowerCase()),
      where("productName", "<=", keyword.toLowerCase() + "\uf8ff"), //키워드
      orderBy("createAt", "desc"),
      limit(pageParam * 12),
    );
    const result = await getDocs(productQuery); //문서화
    result.docs.map((data) => {
      resultArray.push({productId: data.id, productInfo: data.data()}); //필드 고유의 id값과 필드 내용을 배열에 담기
    });
    return resultArray;
  } else { //검색을 하지 않은 기본 페이지
    const productQuery = query(
      productsRef,
      where("heart", "==", "0"),
      orderBy("createAt", "desc"),
      limit(pageParam * 12),
    );
    const result = await getDocs(productQuery); //문서화
    result.docs.map((data) => {
      resultArray.push({productId: data.id, productInfo: data.data()}); //필드 고유의 id값과 필드 내용을 배열에 담기
    });
    return resultArray;
  }
};
//찜 하기
export const productHeart = async (productId: string, userId: string) => {
  const getHeart = doc(db, "product", productId);
  await updateDoc(getHeart, {
    heart: userId,
  });
};
