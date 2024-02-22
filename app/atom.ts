import { RecoilState, atom } from "recoil";

export const signState:RecoilState<string> = atom({
    key: "signProps",
    default: "off"
});

export const snsHeartState:RecoilState<string> = atom({
    key: "heartProps",
    default: ""
});