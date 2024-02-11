"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const SNSContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  label {
    width: 100px;
    height: 60px;
    border: 1px solid red;
  }
`;
export default function CreateSNS() {
  const [preview, set_preview] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

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
  return (
    <>
      <form>
        <SNSContainer>
          <label htmlFor="sns_image">
            <input
              type="file"
              style={{ opacity: 0 }}
              accept="image/*"
              {...register("productImg", {
                required: true,
              })}
              onChange={({ target }: any) => {
                if (target === undefined) getPreview(null);
                if (target) getPreview(target.files[0]);
              }}
              id="sns_image"
            />
          </label>
        </SNSContainer>
        {preview && (
          <Image src={preview as string} alt="" width={300} height={200} />
        )}
      </form>
    </>
  );
}
