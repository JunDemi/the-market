import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";
import { useRecoilState } from "recoil";
import { signState } from "@/app/atom";

const SignDiv = styled.div`
    width: 30rem;
    height: 30rem;
    padding: 3rem;
    background-color: white;
`;

export default function Sign() {
    const [signProp] = useRecoilState(signState);
  return (
    <>
      <SignDiv>
        {signProp === "login" && <Login/>}
        {signProp === "register" && <Register/>}
      </SignDiv>
    </>
  );
}
