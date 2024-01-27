import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
//로그인 페이지 유효성 검사
const loginSchema = Yup.object({
    email: Yup.string().email("유효하지 않은 이메일입니다.").required("이메일을 입력하세요."),
    password: Yup.string().required("비밀번호를 입력하세요.")
});
export const LoginValidation = () => useForm({
    resolver: yupResolver(loginSchema),
    mode: "all"
});

//회원가입 페이지 유효성 검사
const registerSchema = Yup.object({
    email: Yup.string().email("유효하지 않은 이메일입니다.").required("이메일을 입력하세요."),
    password: Yup.string().required("비밀번호를 입력하세요.").min(6, "비밀번호는 최소 6글자 이상이어야 합니다."),
    password_check: Yup.string().required("비밀번호를 입력하세요.").oneOf([Yup.ref('password')], "비밀번호가 일치하지 않습니다.")
});
export const RegisterValidation = () => useForm({
    resolver: yupResolver(registerSchema),
    mode: "all"
});