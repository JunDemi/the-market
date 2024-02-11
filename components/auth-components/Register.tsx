import { signState } from "@/app/atom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import InputField from "./InputField";
import { RegisterValidation } from "@/validationSchema/auth";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useState } from "react";
import { getAuthenticInfo } from "@/services/firebaseCRUD";
//스타일 컴포넌트
const SignContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const SignImage = styled(motion.div)`
  background-image: url("https://wallpapers.com/images/hd/white-pattern-background-nnqjxiito1qd9475.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  z-index: 11;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  p {
    font-size: 15px;
    color: #565656;
  }
  button {
    border: none;
    cursor: pointer;
    padding: 1rem 2.5rem;
    color: white;
    border-radius: 30px;
    font-size: 15px;
  }
`;
const RegisterForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  h1 {
    letter-spacing: 0.2rem;
    font-size: 30px;
  }
  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    input {
      width: 18rem;
      padding: 1rem;
      border: none;
      font-size: 14px;
      letter-spacing: 0.15rem;
      border-radius: 10px;
      transition: all.2s;
      &:focus {
        background-color: #fff1ea;
      }
    }
    button {
      width: 20rem;
      padding: 1rem;
      font-size: 14px;
      border: none;
      letter-spacing: 0.15rem;
      border-radius: 10px;
      transition: all.2s;
      background: linear-gradient(90deg, #ffa85b, #ff0000);
      color: white;
      cursor: pointer;
    }
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: #7d7d7d;
    font-size: 14px;
    span {
      font-size: 16px;
      color: #ff4d00;
      cursor: pointer;
      &:hover {
        color: #ff874b;
      }
    }
  }
`;
const ErrorMessage = styled.p`
    color: #fc5b5b;
    font-size: 12px;
    padding: 10px 0 20px 1rem;
`;
//스타일 컴포넌트
export default function Register() {
  const [signToggle, set_signToggle] = useRecoilState(signState); //로그인 혹은 회원가입 패이지
  const [registSuccess, set_registSuccess] = useState<boolean>(false);
  const [registFailed, set_registFailed] = useState<boolean>(false);
  const [loading, set_loading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = RegisterValidation();

  const submitRegist = async (values: any) => {
    //Submit 이벤트
    set_registFailed(false);
    set_loading(true);
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((응답) => {
        getAuthenticInfo(응답.user.uid, 응답.user.email);
        set_registSuccess(true); //회원가입이 성공하면 팝업이 뜨게
      })
      .catch((에러) => set_registFailed(true)); //회원가입이 실패하면 메세지가 뜨게
    reset();
    set_loading(false);
  };

  const successConfirm = () => {
    signOut(auth);
    set_registSuccess(false);
    set_signToggle("login");
  };
  return (
    <>
      <SignContainer>
        <RegisterForm>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit(submitRegist)}>
            <InputField
              type="email"
              name="email"
              placeholder="이메일"
              register={register}
              error={errors.email}
            />
            <InputField
              type="password"
              name="password"
              placeholder="비밀번호"
              register={register}
              error={errors.password}
            />
            <InputField
              type="password"
              name="password_check"
              placeholder="비밀번호 확인"
              register={register}
              error={errors.password_check}
            />
            <button type="submit" className="material-btn" disabled={loading}>
              {loading ? "로딩중..." : "회원가입"}
            </button>
            {registFailed && <ErrorMessage>이미 사용된 계정이거나 유효하지 않은 이메일입니다.</ErrorMessage>}
          </form>
          <div>
            이미 계정이 있으신가요?
            <span onClick={() => set_signToggle("login")}>로그인</span>
          </div>
        </RegisterForm>
        <SignImage layoutId="SignChange">
          <h1 className="banner-title">The Market에 오신 걸 환영해요!</h1>
          <p>계정이 없으시다면 회원가입 해주세요.</p>
          <motion.button
            initial={{ background: "linear-gradient(90deg, #ffa85b, #ff0000)" }}
            whileHover={{
              background: "linear-gradient(90deg, #5bd9ff, #006aff)",
            }}
            transition={{ duration: 0.2 }}
            onClick={() => set_signToggle("off")}
            className="material-btn"
          >
            창 닫기
          </motion.button>
        </SignImage>
      </SignContainer>
      {registSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sign-popup-overlay"
        >
          <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="sign-popup">
            회원가입에 성공했습니다!
            <button className="material-btn" onClick={successConfirm}>확인</button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
