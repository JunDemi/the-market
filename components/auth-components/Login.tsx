
import { useRecoilState } from "recoil";
import { signState } from "@/app/atom";

export default function Login() {
const [signToggle, set_signToggle] = useRecoilState(signState);
  return (
    <>
      Login
      <button onClick={()=>set_signToggle("register")}>Go Register</button>
    </>
  );
}
