"use client";
import { AuthContext } from "@/app/lib/AuthProvider";
import { db, storage } from "@/services/firebase";
import { deleteProduct, productDetail, updateProduct } from "@/services/firebaseCRUD";
import { IProduct, IProductCreate } from "@/services/type";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
//스타일 컴포넌트
const WriteTitle = styled.h1`
  margin: 3rem 0 1.5rem 0;
  font-size: 22px;
  letter-spacing: -0.06rem;
  color: #858585;
`;
const WriteContainer = styled.div`
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("/white-pattern-background-nnqjxiito1qd9475.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid #bebebe;
  padding: 1rem;
`;
const ImageAndName = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  gap: 1rem;
  label {
    position: relative;
    cursor: pointer;
    width: 70rem;
    height: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
  }
  div {
    width: 100%;
    letter-spacing: -0.07rem;
    h4 {
      font-size: 14px;
      color: #ff963a;
      margin: 25px 0 10px 0;
    }
    input {
      border: 1.5px solid #787878;
      border-radius: 5px;
      color: #797979;
      width: 75%;
      font-size: 15px;
      padding-left: 5px;
      height: 2rem;
    }
    textarea {
      border-radius: 5px;
      letter-spacing: -0.07rem;
      border: 1.5px solid #787878;
      color: #797979;
      width: 98%;
      font-size: 15px;
      padding: 5px;
      height: 10rem;
    }
    P {
      color: #fc5b5b;
      font-size: 12px;
      padding: 10px 0;
    }
  }
`;
const ApplyButtons = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  button {
    cursor: pointer;
    padding: 1rem 4rem;
    font-size: 16px;
    border: none;
    color: white;
  }
`;

//스타일 컴포넌트
export default function UpdateProduct() {
  const { user }: any = AuthContext(); //로그인 상태
  const [preview, set_preview] = useState<string | null>("default");
  const [loading, set_loading] = useState<boolean>(false);
  const pathname = usePathname();
  const keyword = decodeURIComponent(pathname).split("/").pop();
  const [detailData, set_detailData] = useState<IProduct>();

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IProductCreate>({ mode: "onSubmit" });

  useEffect(() => {
    //pathname = 문서ID를 가진 데이터 불러오기
    productDetail(keyword)
      .then((response) => set_detailData(response))
      .catch((error) => console.log(error.message));
  }, [keyword]);
  const getPreview = (files: any) => {
    //이미지 프리뷰 함수
    if (files !== undefined) {
      const reader = new FileReader();
      reader.onloadend = () => {
        set_preview(reader.result as string);
      };
      reader.readAsDataURL(files);
    } else {
      set_preview(null);
    }
  };

  const onValid = async ({ //수정 메소드
    productName,
    price,
    description,
    productImg,
  }: IProductCreate) => {
    set_loading(true); //로딩 시작
    if (productImg[0]) {
      const imageRef = ref(
        //이미지 파일이름: 유저ID + 랜덤조합텍스트 + 파일이름
        storage,
        `product-image/${user.user.uid + uuid() + productImg[0].name}`
      );
      const imgSnap = await uploadBytes(imageRef, productImg[0]); //파이어 스토리지에 이미지 업로드
      const imgpath = await getDownloadURL(imgSnap.ref); //생성된 이미지 파일 링크를 변수에 저장
      await updateProduct(price, description, keyword, productName, imgpath);
    } else {
      await updateProduct(price, description, keyword, productName);
    }

    set_loading(false);
    router.push('/market');
    //reset();
  };

  const onDelete = async() => {
    set_loading(true);
    await deleteProduct(keyword);
    set_loading(false)
    router.push('/market');
  }
  return (
    <>
      <WriteTitle>상품 수정</WriteTitle>
      {detailData ? (
        <form onSubmit={handleSubmit(onValid)}>
          <WriteContainer>
            <ImageAndName>
              <label
                className={
                  errors.productImg
                    ? "image-preview-error"
                    : "image-preview-basic"
                }
                htmlFor="pImg"
              >
                {preview ? (
                  preview === "default" ? (
                    <Image
                      src={detailData.info.productImg}
                      alt=""
                      width={0}
                      height={0}
                      fill
                    />
                  ) : (
                    <Image
                      src={preview as string}
                      alt=""
                      width={0}
                      height={0}
                      fill
                    />
                  )
                ) : (
                  <svg fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </label>
              <div>
                <input
                  type="file"
                  style={{ opacity: 0, width: "0.1px" }}
                  accept="image/*"
                  {...register("productImg", { required: false })}
                  onChange={({ target }: any) => {
                    if (target === undefined) getPreview(null);
                    if (target) getPreview(target.files[0]);
                  }}
                  id="pImg"
                />
                <h4>상품명</h4>
                <input
                  type="text"
                  {...register("productName", {
                    required: "상품명을 적어주세요.",
                  })}
                  defaultValue={detailData?.info.productName}
                  autoComplete="off"
                />
                {errors.productName && <p>{errors.productName?.message}</p>}
                <h4>가격 (원)</h4>
                <input
                  type="number"
                  {...register("price", {
                    required: "가격을 적어주세요.",
                  })}
                  defaultValue={detailData?.info.productPrice}
                  autoComplete="off"
                />
                {errors.price && <p>{errors.price?.message}</p>}
                <h4>상품 설명</h4>
                <textarea
                  {...register("description", {
                    required: "상품설명을 적어주세요.",
                  })}
                  defaultValue={detailData?.info.productDescription}
                  autoComplete="off"
                />
                {errors.description && <p>{errors.description?.message}</p>}
              </div>
            </ImageAndName>
          </WriteContainer>
          <ApplyButtons>
            <motion.button
              disabled={loading}
              type="submit"
              className="material-btn"
              initial={{
                background: "linear-gradient(90deg, #65d8ff, #0659ff)",
              }}
              whileHover={{
                background: "linear-gradient(90deg, #8fe0fb, #4884fc)",
              }}
            >
              {loading ? "로딩중..." : "수정"}
            </motion.button>
            <motion.button
              disabled={loading}
              onClick={onDelete}
              className="material-btn"
              initial={{
                background: "linear-gradient(90deg, #ff6565, #d60202)",
              }}
              whileHover={{
                background: "linear-gradient(90deg, #fa9292, #fe2f2f)",
              }}
            >
              {loading ? "로딩중..." : "삭제"}
            </motion.button>
          </ApplyButtons>
        </form>
      ) : (
        <div className="loading-gif">
          <Image src="/loading2.gif" alt="로딩중..." width={100} height={100} />
        </div>
      )}
    </>
  );
}
