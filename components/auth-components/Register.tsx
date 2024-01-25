import { signState } from "@/app/atom";
import { useRecoilState } from "recoil";

export default function Register() {
const [signToggle, set_signToggle] = useRecoilState(signState);
  return (
    <>
      Register
      <button onClick={()=>set_signToggle("login")}>Go Login</button>
    </>
  );
}
