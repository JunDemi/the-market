import { useRecoilState } from "recoil";
import { signState } from "@/app/atom";
import styled from "styled-components";
import { motion } from "framer-motion";
import InputField from "./InputField";
import {auth} from "@/services/firebase";
import { LoginValidation } from "@/validationSchema/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

//스타일 컴포넌트 시작
const SignContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const SignImage = styled(motion.div)`
  background-image: url("https://wallpapers.com/images/hd/white-pattern-background-nnqjxiito1qd9475.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  z-index: 11;
  display: flex;
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
const LoginForm = styled.div`
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
      &:focus{
        background-color: #eaf0ff;
      }
    }
    button{
      width: 20rem;
      padding: 1rem;
      font-size: 14px;
      border: none;
      letter-spacing: 0.15rem;
      border-radius: 10px;
      transition: all.2s;
      background: linear-gradient(90deg, #5bd9ff, #006aff);
      color: white;
      cursor: pointer;
    }
  }
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: #7d7d7d;
    font-size: 14px;
    span{
      font-size: 16px;
      color: #006aff;
      cursor: pointer;
      &:hover{
        color: #4b96ff;
      }
    }
  }
`;
const ErrorMessage = styled.p`
    color: #fc5b5b;
    font-size: 12px;
    padding: 10px 0 20px 1rem;
`;
//스타일 컴포넌트 끝
export default function Login() {
  const [signToggle, set_signToggle] = useRecoilState(signState);
  const {handleSubmit, register, formState:{errors}, reset} = LoginValidation();
  const [loginFailed, set_loginFailed] = useState<boolean>(false);
  const [loading, set_loading] = useState<boolean>(false);

  const submitLogin = async(values: any) => {
    set_loginFailed(false);
    set_loading(true);
    await signInWithEmailAndPassword(auth, values.email, values.password).then(응답=> (
      set_signToggle("off")
    )).catch(에러 => set_loginFailed(true));
    reset();
    set_loading(false);
  }
  return (
    <>
      <SignContainer>
        <SignImage layoutId="SignChange">
          <h1 className="banner-title">The Market에 오신 걸 환영해요!</h1>
          <p>콘텐츠를 이용하시려면 로그인 해야합니다.</p>
          <motion.button
            initial={{ background: "linear-gradient(90deg, #5bd9ff, #006aff)" }}
            whileHover={{
              background: "linear-gradient(90deg, #ffa85b, #ff0000)",
            }}
            transition={{ duration: 0.2 }}
            onClick={() => set_signToggle("off")}
            className="material-btn"
          >
            창 닫기
          </motion.button>
        </SignImage>
        <LoginForm>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(submitLogin)}>
           <InputField type="email" name="email" placeholder="이메일" register={register} error={errors.email}/>
           <InputField type="password" name="password" placeholder="비밀번호" register={register} error={errors.password}/>
            <button className="material-btn" type="submit">{loading ? "로딩중..." : "로그인"}</button>
            {loginFailed && <ErrorMessage>이메일 또는 비밀번호가 올바르지 않습니다.</ErrorMessage>}
          </form>
          <div>
            계정이 없으신가요?
          <span onClick={() => set_signToggle("register")}>
            회원가입
          </span>
          </div>
        </LoginForm>
      </SignContainer>
    </>
  );
}
