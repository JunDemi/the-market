import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
//상품 등록 유효성 검사
const productSchema = Yup.object({
    email: Yup.string().email("유효하지 않은 이메일입니다.").required("이메일을 입력하세요."),
    password: Yup.string().required("비밀번호를 입력하세요.").min(5, "비밀번호는 최소 5글자 이상이어야 합니다.")
});
export const LoginValidation = () => useForm({
    resolver: yupResolver(productSchema),
    mode: "all"
});
