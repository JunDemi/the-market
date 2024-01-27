"use client";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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
    cursor: pointer;
    padding: 10rem 15rem;
    border: 4px dashed #bebebe;
    transition: 0.2s;
    svg {
      width: 2rem;
      height: 2rem;
      stroke: #bebebe;
      transition: 0.2s;
    }
    &:hover {
      border-color: #fc9d4a;
      svg {
        stroke: #fc9d4a;
      }
    }
  }
  div {
    width: 100%;
    letter-spacing: -0.07rem;
    p {
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
export default function CreateProduct() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <>
      <WriteTitle>상품 등록</WriteTitle>
      <form>
        <WriteContainer>
          <ImageAndName>
            <label>
              <svg fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input type="file" style={{ display: "none" }} accept="image/*" />
            </label>
            <div>
              <p>상품명</p>
              <input type="text" {...register('productName', {
                required: "상품명을 적어주세요."
              })}/>
              <p>가격 (원)</p>
              <input type="number" {...register('price', {
                required: "가격을 적어주세요."
              })}/>
              <p>상품 설명</p>
              <textarea></textarea>
            </div>
          </ImageAndName>
        </WriteContainer>
        <ApplyButtons>
          <motion.button
          type="submit"
            className="material-btn"
            initial={{
              background: "linear-gradient(90deg, #ffc965, #ff6106)",
            }}
            whileHover={{
              background: "linear-gradient(90deg, #fad590, #ff8b48)",
            }}
          >
            등록
          </motion.button>
        </ApplyButtons>
      </form>
    </>
  );
}
//id, userId, userName, productName, productImg, description, price, heart, createAt, updateAt
