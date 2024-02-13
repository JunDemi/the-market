"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { motion } from "framer-motion";
import { db, storage } from "@/services/firebase";
import { v4 as uuid } from "uuid";
import { AuthContext } from "@/app/lib/AuthProvider";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
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
      width: 3rem;
      height: 3rem;
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
  h4 {
    width: 830px;
    margin-top: 20px;
    font-size: 14px;
    color: #727272;
  }
  textarea {
    border-radius: 5px;
    border: 1.5px solid #787878;
    color: #595959;
    width: 830px;
    font-size: 15px;
    margin: 1rem 0 0 0;
    padding: 5px;
    height: 10rem;
  }
  p {
    width: 830px;
    margin-top: 1rem;
    font-size: 13px;
    color: #f65b5b;
  }
`;
const ImagePreviewContainer = styled.div`
  min-width: 50rem;
  min-height: 50px;
  margin: 0.5rem 0;
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
    &:hover {
      svg {
        opacity: 1;
      }
    }
  }
`;
const PreviewImgs = styled.img`
  border-radius: 7px;
  width: 160px;
`;
const SubmitButton = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  button {
    cursor: pointer;
    padding: 1rem 4rem;
    font-size: 16px;
    border: none;
    color: white;
  }
`;
//스타일 컴포넌트
export default function CreateSNS() {
  const { user }: any = AuthContext(); //로그인 상태
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<{ writeText: string }>({ mode: "onSubmit" });
  const [preview, set_preview] = useState<IFileArray[]>([]);
  const [imgError, set_imgError] = useState(false);
  const [loading, set_loading] = useState(false);
  const [writeText, set_writeText] = useState("");
  const [fbImgList, set_fbImgList] = useState<string[]>([]);
  const getPreview = (files: any) => {
    //이미지 프리뷰 함수
    if (files) {
      set_imgError(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (preview.length < 10) {
          set_preview([
            ...preview,
            { filename: files, filedata: reader.result as string },
          ]);
        } else {
          alert("파일은 최대 10개까지 가능합니다"); //파일 최대 개수 제한
          return;
        }
      };
      reader.readAsDataURL(files);
    }
  };
  const onValid = async (text: { writeText: string }) => {
    set_loading(true);
    set_imgError(false);
    if (preview.length > 0) {
      preview.forEach((data) => {
        const imageRef = ref(
          //이미지 파일이름: 유저ID + 랜덤조합텍스트 + 파일이름
          storage,
          `sns-image/${user.user.uid + uuid() + data.filename.name}`
        );
        uploadBytes(imageRef, data.filename).then((imgPath) => {
          getDownloadURL(imgPath.ref).then((url) => {
            set_fbImgList((prev) => [...prev, url]); //여러개의 이미지 주소들을 배열에 저장
          });
        });
      });
      set_writeText(text.writeText);
    } else {
      set_loading(false);
      set_imgError(true);
      return;
    }
  };

  useEffect(() => {
    if(fbImgList.length === preview.length && writeText){ //프리뷰에 있는 배열의 길이와 데이터에 전송된 배열의 길이가 같아질때 실행
      addDoc(collection(db, "sns"), { //실행되면 빠진 값 없이 모두 배열데이터에 들어가진다
        userId: user.user.uid,
        userEmail: user.user.email,
        snsImageArray: fbImgList,
        snsText: writeText,
        snsHeart: [],
        createAt: Date.now(),
        updateAt: Date.now(),
      })
      .then((응답) => router.push("/sns"))
      .catch((에러) => alert("파일 용량이 초과되었습니다."));
      set_loading(false);
    }
  },[fbImgList, writeText])
  return (
    <>
      <WriteTitle>게시물 작성</WriteTitle>
      <form onSubmit={handleSubmit(onValid)}>
        <WriteContainer>
          <label htmlFor="snsFile">
            <svg fill="none" viewBox="0 0 48 48" aria-hidden="true">
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
          {imgError && <p>업로드 된 파일이 없습니다.</p>}
          {preview && preview.length > 0 && (
            <>
              <h4>미리보기</h4>
              <ImagePreviewContainer>
                {preview.map((data, number) => (
                  <div key={number}>
                    <svg
                      onClick={() => {
                        //사진 프리뷰 배열 삭제 메소드
                        preview.splice(preview.indexOf(data), 1);
                        set_preview([...preview]);
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
            </>
          )}
          <h4>글 작성</h4>
          <textarea
            {...register("writeText", {
              required: "글 내용이 비어있습니다.",
            })}
          />
          {errors.writeText && <p>{errors.writeText.message}</p>}
        </WriteContainer>
        <SubmitButton>
          <motion.button
            disabled={loading}
            type="submit"
            className="material-btn"
            initial={{
              background: "linear-gradient(90deg, #65ccff, #067aff)",
            }}
            whileHover={{
              background: "linear-gradient(90deg, #98d9fa, #4296f6)",
            }}
          >
            {loading ? "로딩중..." : "등록"}
          </motion.button>
        </SubmitButton>
      </form>
    </>
  );
}
