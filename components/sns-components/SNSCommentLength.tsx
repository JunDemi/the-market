import { readSNSComment } from "@/services/firebaseCRUD";
import { ICommentData } from "@/services/type";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface IData{
    userId: string;
    userEmail: string;
    commentText: string;
    createAt: number;
    updateAt: number;
}
export default function SNSCommentLength({snsId, close}: {snsId: string, close: boolean}) {
    const [data, set_data] = useState<ICommentData[]>();
   useEffect(()=>{
    readSNSComment(snsId).then(response => set_data(response)).catch(error => console.log(error.message));
   },[snsId, close]);
    if(data){
        return(
            <p>댓글 {data.length}개</p>
    );
    }
}