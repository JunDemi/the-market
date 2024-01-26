"use client";
import styled from "styled-components";

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const WriteTitle = styled.div`
  width: 55vw;
  text-align: left;
  font-size: 13px;
  color: #585858;
`;
const WriteForm = styled.div`
  height: 50dvh;
  background-image: url("/white-pattern-background-nnqjxiito1qd9475.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 3px 3px 7px -3px #676767;
  border-radius: 10px;
  padding: 1rem;
  width: 55vw;
  span:nth-child(1){
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 1.5rem;
  }
`;
const ImagePreview = styled.div`
  border: 2px solid #565656;
  border-radius: 10px;
  width: 10rem;
  height: 10rem;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

`;

export default function CreateProduct() {
  return (
    <WriteContainer>
      <WriteTitle>상품 등록</WriteTitle>
      <WriteForm>
        <span>
          <ImagePreview>
            <p>Image Here</p>
          </ImagePreview>
          <div>
            <p>상품명</p>
            <input type="text"/>
          </div>
        </span>
      </WriteForm>
    </WriteContainer>
  );
}
//id, userId, userName, productName, productImg, description, price, heart, createAt, updateAt
