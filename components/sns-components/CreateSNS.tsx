"use client";
import { useState } from "react";
import styled from "styled-components";

interface IFileArray {
  filename: any;
  filedata: string;
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
    url("/white-pattern-background-nnqjxiito1qd9475.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid #bebebe;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    cursor: pointer;
    position: relative;
    width: 30rem;
    height: 15rem;
    border: 4px dashed #bebebe;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 2rem;
      height: 2rem;
      stroke: #bebebe;
      transition: 0.2s;
    }
    &:hover {
      border-color: #4ab2fc;

      svg {
        stroke: #4aa9fc;
      }
    }
  }
`;
const ImagePreviewContainer = styled.div`
  min-width: 50rem;
  min-height: 50px;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #bebebe;
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  div {
    position: relative;
    svg {
      opacity: 0;
      cursor: pointer;
      position: absolute;
      top: 5px;
      right: 5px;
      width: 25px;
      height: 25px;
      fill: #ffffffd7;
      stroke: #1972f8d9;
      transition: all.1s;
    }
    &:hover{
      svg{
        opacity: 1;
      }
    }
  }
`;
const PreviewImgs = styled.img`
  border-radius: 10px;
  width: 160px;
`;
//스타일 컴포넌트
export default function CreateSNS() {
  const [preview, set_preview] = useState<IFileArray[]>([]);
  const getPreview = (files: any) => {
    //이미지 프리뷰 함수
    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        set_preview([...preview, {filename: files.name, filedata: reader.result as string}]);
      };
      reader.readAsDataURL(files);
    }
  };
  console.log(preview);
  return (
    <>
      <WriteTitle>게시물 작성</WriteTitle>
      <WriteContainer>
        <label htmlFor="snsFile">
          <svg fill="none" viewBox="0 0 48 48" aria-hidden="true" >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="file"
            id="snsFile"
            style={{ opacity: 0, position: "absolute" }}
            accept="image/*"
            onChange={({ target }: any) => {
              if (target === undefined) getPreview(null);
              if (target) getPreview(target.files[0]);
            }}
          />
        </label>
        {preview && preview.length > 0 && (
          <ImagePreviewContainer>
            {preview.map((data, number) => (
              <div key={number}>
                <svg
                onClick={()=> { //사진 프리뷰 배열 삭제 메소드
                  preview.splice(preview.indexOf(data), 1)
                  set_preview([...preview])
                }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <PreviewImgs src={data.filedata as string} />
              </div>
            ))}
          </ImagePreviewContainer>
        )}
      </WriteContainer>
    </>
  );
}
