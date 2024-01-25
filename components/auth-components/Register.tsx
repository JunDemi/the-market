import { signState } from "@/app/atom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import InputField from "./InputField";
import { RegisterValidation } from "@/validationSchema/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";

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
export default function Register() {
  const [signToggle, set_signToggle] = useRecoilState(signState); //로그인 혹은 회원가입 패이지
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = RegisterValidation(); 
  const submitRegist = (values:any) => { //Submit 이벤트
    createUserWithEmailAndPassword(auth, values.email, values.password).then(응답 => {
      console.log("Firebase user: ", 응답)
    }).catch(에러=> console.log("Catch Errors: ", 에러.message));
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
            <button type="submit" className="material-btn">
              회원가입
            </button>
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
    </>
  );
}
