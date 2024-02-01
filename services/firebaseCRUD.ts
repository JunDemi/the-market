import {
  addDoc,
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
//types
interface IBuyData {
  pName: string;
  pPrice: number;
  pImg: string;
  pDesc: string;
  buyerId: string;
  buyerEmail: string;
  sellerId: string;
  sellerEmail: string
}
//Firestore 테이블 불러오기
const productsRef = collection(db, "product");

//상품 목록 불러오기
export const readProduct = async (
  pageParam: number,
  keyword?: string | null
) => {
  const resultArray: any = [];
  if (keyword) {
    //검색을 했을 경우
    const productQuery = query(
      productsRef,
      where("heart", "==", "0"),
      orderBy("productName"),
      where("productName", ">=", keyword.toLowerCase()),
      where("productName", "<=", keyword.toLowerCase() + "\uf8ff"), //키워드
      orderBy("createAt", "desc"),
      limit(pageParam * 12)
    );
    const result = await getDocs(productQuery); //문서화
    result.docs.map((data) => {
      resultArray.push({ productId: data.id, productInfo: data.data() }); //필드 고유의 id값과 필드 내용을 배열에 담기
    });
    return resultArray;
  } else {
    //검색을 하지 않은 기본 페이지
    const productQuery = query(
      productsRef,
      where("heart", "==", "0"),
      orderBy("createAt", "desc"),
      limit(pageParam * 12)
    );
    const result = await getDocs(productQuery); //문서화
    result.docs.map((data) => {
      resultArray.push({ productId: data.id, productInfo: data.data() }); //필드 고유의 id값과 필드 내용을 배열에 담기
    });
    return resultArray;
  }
};
//찜 하기
export const productHeart = async (productId?: string, userId?: string) => {
  if (productId && userId) {
    const updateRef = doc(db, "product", productId);
    await updateDoc(updateRef, {
      heart: userId,
    });
  }
};
//상품 상세
export const productDetail = async (keyword?: string) => {
  const resultData: any = {};
  const productQuery = query(productsRef, where(documentId(), "==", keyword));
  const result = await getDocs(productQuery); //문서화
  result.docs.map((data) => {
    resultData.info = data.data();
  });
  return resultData;
};
//상품 수정
export const updateProduct = async (
  price: number,
  description: string,
  productId?: string,
  productName?: string,
  img?: string
) => {
  if (productId && productName) {
    const updateRef = doc(db, "product", productId);
    if(img){//이미지를 변경했으면
      await updateDoc(updateRef, {
        productImg: img,
        productName: productName,
        productPrice: price,
        productDescription: description,
        updateAt: Date.now()
      });
    }else{//이미지를 변경하지 않았으면
      await updateDoc(updateRef, {
        productName: productName,
        productPrice: price,
        productDescription: description,
        updateAt: Date.now()
      });
    } 
  }
};
//상품 삭제
export const deleteProduct = async(productId?: string) => {
  if(productId){
    await deleteDoc(doc(db, "product", productId));
  }
}
//상품 구매 & 판매
export const buyProduct = async(buyData: IBuyData) => {
  await addDoc(collection(db, "buy"), {
    productName: buyData.pName,
    productPrice: buyData.pPrice,
    productImg: buyData.pImg,
    productDescription: buyData.pDesc,
    buyerId: buyData.buyerId,
    buyerEmail: buyData.buyerEmail,
    sellerId: buyData.sellerId,
    sellerEmail: buyData.sellerEmail
  })
}