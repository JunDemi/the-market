import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import WriteButton from "../WriteButton";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { readIDSNSList } from "@/services/firebaseCRUD";
import PostSlider from "../sns-components/PostSlider";
import Image from "next/image";
import SNSDetail from "../sns-components/SNSDetail";
import SNSCommentLength from "../sns-components/SNSCommentLength";
import { useRecoilState } from "recoil";
import { isDeleteSNS } from "@/app/atom";

interface ISNSList {
  snsId: string;
  snsInfo: {
    userId: string;
    userEmail: string;
    snsImageArray: string[];
    snsText: string;
    snsHeart: string[];
    createAt: number;
    updateAt: number;
  };
}
//스타일 컴포넌트
const Post = styled.div`
  width: 40rem;
  margin: 1rem auto 3rem auto;
  background-color: white;
  box-shadow: 3px 3px 4px #787878;
`;
const PostHeart = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  font-size: 13px;
  color: #616161;
`;
const PostText = styled.p`
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  font-size: 15px;
`;
const PostComment = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  p {
    color: #848484;
    font-size: 14px;
  }
  button {
    border: none;
    padding: 5px 10px;
    border-radius: 30px;
    font-size: 13px;
    cursor: pointer;
  }
`;
const SNSOverlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
`;
const CloseButton = styled.div`
  width: 65rem;
  display: flex;
  justify-content: end;
  margin-bottom: 0.5rem;
  svg {
    cursor: pointer;
  }
`;
//스타일 컴포넌트
export default function MySNSList(yourId: { yourId?: string }) {
  const [close, set_close] = useRecoilState(isDeleteSNS); //sns삭제 시 리코일 신호를 전송하여 오버레이 닫기
  const [goOverlay, set_goOverlay] = useState<boolean>(false);
  const [moreData, set_moreData] = useState("");
  const {
    isLoading,
    data: snsData,
    refetch,
  } = useQuery<ISNSList[]>(["mysns_list"], () => readIDSNSList(yourId.yourId));
  const getOverlay = (snsId: string) => {
    set_goOverlay(true);
    set_moreData(snsId);
  };
  useEffect(() => {
    //게시물 삭제 시 오버레이 닫고 리패치
    if(close === "close"){
      set_goOverlay(false);
      refetch();
      set_close("");
    }
  },[goOverlay, close])
  return (
    <>
      {!isLoading && snsData ? 
        snsData.length === 0 ?
          <div className="no-sns">
            작성한 글이 없습니다.
          </div>
        :
        <>
          {snsData.map((data, num) => (
            <div key={num}>
              <Post>
                <PostSlider data={data} />
                <PostHeart>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#83c2f5"
                    style={{ width: "2rem", height: "2rem" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>

                  <h4>좋아요{data.snsInfo.snsHeart.length}개</h4>
                </PostHeart>
                <PostText>
                  {data.snsInfo.snsText.length > 30
                    ? data.snsInfo.snsText.slice(0, 30) + "..."
                    : data.snsInfo.snsText}
                </PostText>
                <PostComment>
                <SNSCommentLength snsId={data.snsId} close={goOverlay}/>
                  <motion.button
                    onClick={() => getOverlay(data.snsId)}
                    className="material-btn"
                    initial={{
                      background: "linear-gradient(90deg, #d3fafa, #c7c5f8)",
                    }}
                    whileHover={{
                      background: "linear-gradient(90deg, #b8f9f9, #afadf8)",
                    }}
                  >
                    모두 보기
                  </motion.button>
                </PostComment>
              </Post>
            </div>
          ))}

          <AnimatePresence>
            {goOverlay ? (
              <>
                <SNSOverlay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CloseButton>
                    <svg
                      onClick={() => {
                        set_goOverlay(false);
                        refetch();
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      style={{
                        width: "2rem",
                        height: "2rem",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </CloseButton>
                  <SNSDetail snsId={moreData} />
                </SNSOverlay>
              </>
            ) : null}
          </AnimatePresence>
        </>
      : (
        <div className="loading-gif">
          <Image src="/loading2.gif" alt="로딩중..." width={100} height={100} />
        </div>
      )}
    </>
  );
}
