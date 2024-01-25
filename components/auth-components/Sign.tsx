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
      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="red" style={{ width: "30px", height: "30px", cursor: "pointer" }} onClick={() => set_signProp("off")}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg> */}
        {signProp === "login" && <Login/>}
        {signProp === "register" && <Register/>}
      </SignDiv>
    </>
  );
}
