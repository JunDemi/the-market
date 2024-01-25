import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";
import { useRecoilState } from "recoil";
import { signState } from "@/app/atom";

const SignDiv = styled.div`
    width: 55rem;
    height: 100dvh;
    background: linear-gradient(90deg, #ffe6e6, #d0efff);
`;

export default function Sign() {
    const [signProp, set_signProp] = useRecoilState(signState);
  return (
    <>
      <SignDiv>
        {signProp === "login" && <Login/>}
        {signProp === "register" && <Register/>}
      </SignDiv>
    </>
  );
}
