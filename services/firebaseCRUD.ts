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
import { ISale } from "./type";
//Firestore 테이블 불러오기
const authRef = collection(db, "profiles");
const productsRef = collection(db, "product");
const buyRef = collection(db, "buy");
const snsRef = collection(db, "sns");
const snsCommentRef = collection(db, "snscomment");
/*--------------------------- Autentication ---------------------------*/
//회원가입 후 사용자 계정 정보를 DB에 추가 저장
export const getAuthenticInfo = (uid: string, uemail: string | null) => {
  addDoc(collection(db, "profiles"), {
    userId: uid,
    userEmail: uemail,
    profileImg: "default",
  });
};
//사용자 계정 정보 불러오기
export const getMyProfile = async (userId?: string) => {
  const resultArray: any = [];
  if (userId) {
    const profileQuery = query(authRef, where("userId", "==", userId));
    const result = await getDocs(profileQuery); //문서화
    result.docs.map((data) => {
      resultArray.push({ profileId: data.id, profileInfo: data.data() });
    });
    return resultArray;
  }
};
//프로필 사진 수정하기
export const updateProfile = async (
  profileImg?: string,
  profileId?: string
) => {
  if (profileId && profileImg) {
    const updateRef = doc(db, "profiles", profileId);
    await updateDoc(updateRef, {
      profileImg: profileImg,
    });
  }
};
//sns검색 시 이메일을 통해 userId가져오기
export const getSearchUserId = async (userEmail?: string) => {
  const resultArray: any = [];
  if(userEmail){
    const profileQuery = query(authRef, where("userEmail", "==", userEmail));
    const result = await getDocs(profileQuery); //문서화
    result.docs.map((data) => {
      resultArray.push({ profileId: data.id, profileInfo: data.data() });
    });
    return resultArray;
  }
};
/*--------------------------- Products ---------------------------*/
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
      limit(pageParam * 6)
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
      limit(pageParam * 6)
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
    resultData.productInfo = data.data();
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
    if (img) {
      //이미지를 변경했으면
      await updateDoc(updateRef, {
        productImg: img,
        productName: productName,
        productPrice: price,
        productDescription: description,
        updateAt: Date.now(),
      });
    } else {
      //이미지를 변경하지 않았으면
      await updateDoc(updateRef, {
        productName: productName,
        productPrice: price,
        productDescription: description,
        updateAt: Date.now(),
      });
    }
  }
};
//상품 삭제
export const deleteProduct = async (productId?: string) => {
  if (productId) {
    await deleteDoc(doc(db, "product", productId));
  }
};
//상품 구매 & 판매내역을 DB에 저장
export const buyProduct = async (buyData: ISale) => {
  await addDoc(collection(db, "buy"), {
    productName: buyData.productName,
    productPrice: buyData.productPrice,
    productImg: buyData.productImg,
    productDescription: buyData.productDescription,
    buyerId: buyData.buyerId,
    buyerEmail: buyData.buyerEmail,
    sellerId: buyData.sellerId,
    sellerEmail: buyData.sellerEmail,
    buyDate: Date.now(),
  });
};
//찜한 상품 목록 불러오기
export const readHeartProduct = async (pageParam: number, userId?: string) => {
  const resultArray: any = [];
  if (userId) {
    const productQuery = query(
      productsRef,
      where("heart", "==", userId),
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
/*--------------------------- Buy ---------------------------*/
//구매 및 판매내역 불러오기
export const readBuyList = async (
  type: string,
  userId?: string,
  pageParam?: number
) => {
  const resultArray: any = [];
  if (userId) {
    if (pageParam) {
      if (type === "buy") {
        const buyQuery = query(
          buyRef,
          where("buyerId", "==", userId),
          orderBy("buyDate", "desc"),
          limit(pageParam * 5)
        );
        const result = await getDocs(buyQuery);
        result.docs.map((data) => {
          resultArray.push({ buyId: data.id, buyInfo: data.data() });
        });
        return resultArray;
      } else if (type === "sell") {
        const sellQuery = query(
          buyRef,
          where("sellerId", "==", userId),
          orderBy("buyDate", "desc"),
          limit(pageParam * 5)
        );
        const result = await getDocs(sellQuery);
        result.docs.map((data) => {
          resultArray.push({ buyId: data.id, buyInfo: data.data() });
        });
        return resultArray;
      }
    } else {
      if (type === "buy") {
        const buyQuery = query(
          buyRef,
          where("buyerId", "==", userId),
          orderBy("buyDate", "desc")
        );
        const result = await getDocs(buyQuery);
        result.docs.map((data) => {
          resultArray.push({ buyId: data.id, buyInfo: data.data() });
        });
        return resultArray;
      } else if (type === "sell") {
        const sellQuery = query(
          buyRef,
          where("sellerId", "==", userId),
          orderBy("buyDate", "desc")
        );
        const result = await getDocs(sellQuery);
        result.docs.map((data) => {
          resultArray.push({ buyId: data.id, buyInfo: data.data() });
        });
        return resultArray;
      }
    }
  }
};
//구매 & 판매 상세
export const buyDetail = async (buyId?: string) => {
  const resultData: any = {};
  const buyQuery = query(buyRef, where(documentId(), "==", buyId));
  const result = await getDocs(buyQuery); //문서화
  result.docs.map((data) => {
    resultData.buyInfo = data.data();
  });
  return resultData;
};
/*--------------------------- SNS ---------------------------*/
export const readSNSList = async (pageParam?: number, keyword?: string) => { //sns조회
  const resultArray: any = [];
  
    if(pageParam){ //일반 조회
      if(keyword){ //일반 조회: 검색을 했을 경우
        const snsQuery = query(
          snsRef,
          orderBy("userEmail"),
          where("userEmail", ">=", keyword),
          where("userEmail", "<=", keyword + "\uf8ff"), //키워드
          orderBy("createAt", "desc"),
          limit(pageParam * 1)
        );
        const result = await getDocs(snsQuery); //문서화
        result.docs.map((data) => {
          resultArray.push({ snsId: data.id, snsInfo: data.data() }); //필드 고유의 id값과 필드 내용을 배열에 담기
        });
        return resultArray;
      }else{ //일반 조회
        const snsQuery = query(
          snsRef,
          orderBy("createAt", "desc"),
          limit(pageParam * 1)
        );
        const result = await getDocs(snsQuery); //문서화
        result.docs.map((data) => {
          resultArray.push({ snsId: data.id, snsInfo: data.data() }); //필드 고유의 id값과 필드 내용을 배열에 담기
        });
        return resultArray;
      }
     
    }
  
};
//userID별 sns게시글 조회
export const readIDSNSList = async (userId?: string) => {
  const resultArray: any = [];
  if(userId){ //해당 유저가 작성한 sns
    const snsQuery = query(
      snsRef,
      where("userId", "==", userId),
      orderBy("createAt", "desc"),
    );
    const result = await getDocs(snsQuery); //문서화
    result.docs.map((data) => {
      resultArray.push({ snsId: data.id, snsInfo: data.data() }); //필드 고유의 id값과 필드 내용을 배열에 담기
    });
    return resultArray;
  }
}

//좋아요
export const updateSNSHeart = async (snsId: string, myUserId: string, isHeart: string) => {
    const updateRef = doc(db, "sns", snsId);
    if(isHeart === "+"){
      await updateDoc(updateRef, {
        snsHeart: arrayUnion(myUserId), //arrayUnion, arrayRemove: 배열 형태의 데이터 타입 추가,삭제기능은 이것을 사용
      });
    }else if(isHeart === "-"){
      await updateDoc(updateRef, {
        snsHeart: arrayRemove(myUserId),
      });
    }
};
//sns게시물 상세
export const getSNSDetail = async(snsId: string) => {
  const resultData: any = {};
  const snsQuery = query(snsRef, where(documentId(), "==", snsId));
  const result = await getDocs(snsQuery); //문서화
  result.docs.map((data) => {
    resultData.snsInfo = data.data();
  });
  return resultData;
}
//sns게시물 삭제
export const deleteSNS = async (snsid: string) => {
    await deleteDoc(doc(db, "sns", snsid));
};
/*--------------------------- SNS댓글 ---------------------------*/
//sns댓글 추가
export const addSNSComment = async(snsId: string, commentText: string, userId?: string, userEmail?: string) => {
  if(userId && userEmail){
    addDoc(collection(db, "snscomment"), {
      snsId: snsId,
      userId: userId,
      userEmail: userEmail,
      commentText: commentText,
      createAt: Date.now(),
      updateAt: Date.now(),
    })
  }
}
//sns댓글 조회
export const readSNSComment = async( snsId: string, pageParam?: number) => {
  const resultArray: any = [];
  if(pageParam){ //게시물 상세 페이지 전용
    const snsQuery = query(
      snsCommentRef,
      where("snsId", "==", snsId),
      orderBy("createAt", "desc"),
      limit(pageParam * 5)
    );
    const result = await getDocs(snsQuery);
    result.docs.map((data) => {
      resultArray.push({ commentId: data.id, commentInfo: data.data() });
    });
    return resultArray;
  }else{ //댓글 개수 세기 전용
    const snsQuery = query(
      snsCommentRef,
      where("snsId", "==", snsId),
      orderBy("createAt", "desc")
    );
    const result = await getDocs(snsQuery);
    result.docs.map((data) => {
      resultArray.push(data.data());
    });
    return resultArray;
  }
}
//sns댓글삭제
export const deleteSNSComment = async(commentId?: string, snsId?: string) => {
  if(commentId && !snsId){ //댓글 낱개 삭제
    deleteDoc(doc(db, "snscomment", commentId));
  }else if(!commentId && snsId){ //sns게시물에 있는 모든 댓글 삭제
    const commentQuery = query(
      snsCommentRef,
      where("snsId", "==", snsId),
    );
    const result = await getDocs(commentQuery);
    result.docs.map(data => {
      deleteDoc(data.ref);
    })
    
  }
}