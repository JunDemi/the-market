import { ErrorOption } from "react-hook-form";
/*----------------------마켓 관련-------------------------*/
export interface ISale {
  //구매, 판매 정보
  buyDate?: string;
  buyerId: string;
  buyerEmail: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImg: string;
  sellerId: string;
  sellerEmail: string;
}
export interface IBuyDetail {
  //구매, 판매정보 2
  buyId?: string;
  buyInfo: {
    buyDate: string;
    buyerId: string;
    buyerEmail: string;
    productName: string;
    productPrice: number;
    productDescription: string;
    productImg: string;
    sellerId: string;
    sellerEmail: string;
  };
}
export interface IBuyer {
  //베스트 구매,판매자
  buyer: string;
  count: number;
}
export interface IProductCreate {
  //상품 등록
  productImg: any;
  productName: string;
  price: number;
  description: string;
}
export interface IProduct {
  //상품 정보
  productId?: string;
  productInfo: {
    userId: string;
    userEmail: string;
    productName: string;
    productImg: string;
    productPrice: number;
    productDescription: string;
    createAt: number;
    updateAt: number;
    heart: string;
  };
}
export interface IKeyword {
  //상품 검색 키워드
  keyword?: string | null;
}
/*------------------------SNS 관련------------------------*/
export interface IHeart {
  //베스트 좋아요
  email: string;
  heartCount: number;
}
export interface EmailTotal {
  //베스트 좋아요 통합 이메일
  email: string;
  total: number;
}
export interface ISNSData {
  //SNS정보
  userId: string;
  userEmail: string;
  snsImageArray: string[];
  snsText: string;
  snsHeart: string[];
  createAt: number;
  updateAt: number;
}
export interface ISNSList {
  //SNS정보 2
  snsId: string;
  snsInfo: {
    userId: string;
    userEmail: string;
    snsImageArray: string[];
    snsText: string;
    snsHeart: string[];
    createAt: number;
    updateAt: number;
  };
}
export interface IFileArray {
  //배열에 넣을 이미지 목록
  filename: any;
  filedata: string;
}
export interface ICommentProps {
  //prop에 전달받은 작성자 정보
  snsId: string;
  userId: string;
  userEmail: string;
  writerData: ISNSList;
  writerImg: string;
}
export interface ICommentList {
  //댓글 정보
  commentId: string;
  commentInfo: ICommentData;
}
export interface ICommentData {
  //댓글 기본 정보
  userId: string;
  userEmail: string;
  commentText: string;
  createAt: number;
  updateAt: number;
}
/*------------------------유저 관련------------------------*/
export interface InputType {
  //InputField.tsx
  type: string;
  name: string;
  placeholder: string;
  register: any;
  error: undefined | ErrorOption;
}
export interface IMyProfile {
  //유저 기본 정보
  profileId: string;
  profileInfo: {
    userId: string;
    userEmail: string;
    profileImg: string;
  };
}

