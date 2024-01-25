"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

const Context = createContext({});

interface UserType{
    user: any;
    isLogin: boolean;
}

const AuthProvider = ({ children }: any) => { //로그인 상태 확인하기: 레이아웃에 감싸도록 한다
    const initialState = {
        user: null,
        isLogin: false
    }
  const [user, set_user] = useState<UserType>(initialState);
useEffect(()=> {
    const subscribe = auth.onAuthStateChanged((userState) => {
        set_user({
            isLogin: userState ? true : false,
            user: userState
        })
        return subscribe;
    });
},[]);

  return (
    <Context.Provider value={{ user, set_user }}>{children}</Context.Provider>
  );
}

export const AuthContext = () => useContext(Context);
export default AuthProvider;