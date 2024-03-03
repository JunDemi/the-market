import { signState } from "@/app/atom";
import { InputType } from "@/services/type";
import { useRecoilState } from "recoil";
import styled from "styled-components";

//스타일 컴포넌트
const InputStyle = styled.input`
  width: 18rem;
  padding: 1rem;
  border: none;
  font-size: 14px;
  letter-spacing: 0.15rem;
  border-radius: 10px;
  transition: all.2s;
`;
const ErrorMessage = styled.p`
    color: #fc5b5b;
    font-size: 12px;
    width: 100%;
    padding: 10px 0 20px 1rem;
`;
//스타일 컴포넌트
export default function InputField({ type, name, placeholder, register, error }: InputType) {
const [signToggle] = useRecoilState(signState);
  return (
    <>
      <InputStyle
        {...register(name)}
        type={type}
        name={name}
        placeholder={placeholder}
        id={`field_${name}`}
        autoComplete="off"
        className={signToggle === "login" ? "login-focus" : "register-focus"}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </>
  );
}
