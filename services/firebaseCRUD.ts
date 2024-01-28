import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
//Firestore 테이블 불러오기
const productsRef = collection(db, "product");

//상품 목록 불러오기
export const readProduct = async() => {
    const resultArray:any = [];
    const productQuery = query(productsRef, where("heart", "==", "0"), orderBy("createAt", "desc")); //불러온 테이블 정렬을 위한 쿼리 (찜하기가 되어있지 않은 것들만)
    const result = await getDocs(productQuery); //문서화
    result.docs.map(data => {
        resultArray.push([data.id,data.data()]) //필드 고유의 id값과 필드 내용을 배열에 담기
    });
   return resultArray;
}
//찜 하기
export const productHeart = async(productId:string, userId: string) => {
    const getHeart = doc(db, "product" ,productId);
    await updateDoc(getHeart, {
        heart: userId
      });
}