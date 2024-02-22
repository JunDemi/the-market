import { readSNSComment } from "@/services/firebaseCRUD";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface IData{
    userId: string;
    userEmail: string;
    commentText: string;
    createAt: number;
    updateAt: number;
}
export default function SNSCommentLength({snsId}: {snsId: string}) {
    const [data, set_data] = useState<IData[]>();
   useEffect(()=>{
    readSNSComment(snsId).then(response => set_data(response)).catch(error => console.log(error.message));
   },[]);
    if(data){
        return(
            <p>댓글 {data.length}개</p>
    );
    }
}