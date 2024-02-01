"use client";
import { AuthContext } from "@/app/lib/AuthProvider";
import { db, storage } from "@/services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { v4 as uuid } from 'uuid';

interface IProductCreate {
  productImg: any;
  productName: string;
  price: number;
  description: string;
}
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
    url("white-pattern-background-nnqjxiito1qd9475.jpg");
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
  margin-top: 1rem;
  display: flex;
  justify-content: end;
  button {
    cursor: pointer;
    padding: 1rem 4rem;
    font-size: 16px;
    border: none;
    color: white;
  }
`;

//스타일 컴포넌트
export default function CreateProduct() {
  const { user }: any = AuthContext(); //로그인 상태
  const [preview, set_preview] = useState<string | null>(null);
  const [loading, set_loading] = useState<boolean>(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IProductCreate>({ mode: "onSubmit" });

  const getPreview = (files: any) => {
    //이미지 프리뷰 함수
    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        set_preview(reader.result as string);
      };
      reader.readAsDataURL(files);
    } else {
      set_preview(null);
    }
  };

  const onValid = async ({
    productName,
    price,
    description,
    productImg,
  }: IProductCreate) => {
    set_loading(true); //로딩 시작
    const imageRef = ref( //이미지 파일이름: 유저ID + 랜덤조합텍스트 + 파일이름
      storage,
      `product-image/${user.user.uid + uuid() + productImg[0].name}`
    );
    const imgSnap = await uploadBytes(imageRef, productImg[0]); //파이어 스토리지에 이미지 업로드
    const imgpath = await getDownloadURL(imgSnap.ref); //생성된 이미지 파일 링크를 변수에 저장
    
    await addDoc(collection(db, "product"), { //addDoc -> insert into
      //Firebase에 삽입
      userId: user?.user.uid,
      userEmail: user?.user.email,
      productName: productName.toLowerCase(),
      productPrice: price,
      productDescription: description.replace("\\n", "\n"),
      productImg: String(imgpath),
      createAt: Date.now(),
      updateAt: Date.now(),
      heart: "0",
    })
      .then((응답) => router.push("/market"))
      .catch((에러) => alert("이미지는 1MB이하의 파일로 해주세요."));
    set_loading(false);
    //reset();
  };
  return (
    <>
      <WriteTitle>상품 등록</WriteTitle>
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
                <Image
                  src={preview as string}
                  alt=""
                  width={0}
                  height={0}
                  fill
                />
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
                {...register("productImg", {
                  required: true,
                })}
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
                autoComplete="off"
              />
              {errors.productName && <p>{errors.productName?.message}</p>}
              <h4>가격 (원)</h4>
              <input
                type="number"
                {...register("price", {
                  required: "가격을 적어주세요.",
                })}
                autoComplete="off"
              />
              {errors.price && <p>{errors.price?.message}</p>}
              <h4>상품 설명</h4>
              <textarea
                {...register("description", {
                  required: "상품설명을 적어주세요.",
                })}
                autoComplete="off"
              ></textarea>
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
              background: "linear-gradient(90deg, #ffc965, #ff6106)",
            }}
            whileHover={{
              background: "linear-gradient(90deg, #fad590, #ff8b48)",
            }}
          >
            {loading ? "로딩중..." : "등록하기"}
          </motion.button>
        </ApplyButtons>
      </form>
    </>
  );
}
