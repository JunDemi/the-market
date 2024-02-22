import {
  addSNSComment,
  readSNSComment,
  updateSNSHeart,
} from "@/services/firebaseCRUD";
import { getDateTimeFormat } from "@/services/getDay";
import Link from "next/link";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import CommentProfileImg from "./\bCommentProfileImg";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { snsHeartState } from "@/app/atom";
interface ISNSList {
  info: {
    userId: string;
    userEmail: string;
    snsImageArray: string[];
    snsText: string;
    snsHeart: string[];
    createAt: number;
    updateAt: number;
  };
}
interface IProps {
  snsId: string;
  userId: string;
  userEmail: string;
  writerData: ISNSList;
  writerImg: string;
}
interface ICommentList {
  commentId: string;
  commentInfo: {
    userId: string;
    userEmail: string;
    commentText: string;
    createAt: number;
    updateAt: number;
  };
}
//styled component
const PostSection = styled.div`
  height: 490px;
  background-color: #f9f9f9;
  padding: 1rem;
  overflow-y: scroll;
`;
const PostDescription = styled.div`
  display: flex;
  margin-bottom: 3rem;
  justify-content: start;
  align-items: start;
  span {
    background-size: cover;
    background-repeat: no-repeat;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.7rem;
    h5 {
      font-weight: bold;
      color: #06002a;
      font-size: 13px;
    }
    p {
      font-size: 12px;
      max-width: 200px;
      line-height: 1rem;
    }
  }
  h4 {
    color: #939393;
    flex-grow: 1;
    font-size: 12px;
    padding-top: 1.1rem;
    text-align: right;
  }
`;
const Postinput = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  form {
    border-top: 1px solid #d7d7d7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    input {
      border: none;
      padding: 1.5rem 0;
      font-size: 16px;
      width: 90%;
    }
    button {
      padding: 1rem;
      cursor: pointer;
      border: none;
      background: none;
      svg {
        stroke: #0fadf1;
        width: 1.5rem;
        height: 1.5rem;
        transition: all.2s;
        &:hover {
          stroke: #79cbee;
        }
      }
    }
  }
`;
const PostHeart = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  font-size: 13px;
  color: #616161;
  svg {
    cursor: pointer;
  }
`;
//styled component
export default function SNSComment({
  snsId,
  userId,
  userEmail,
  writerData,
  writerImg,
}: IProps) {
  const [, set_snsHeart] = useRecoilState(snsHeartState); //좋아요 클릭 시 리코일 이벤트 발생시켜 상위 컴포넌트에 신호 전달
  const {
    isLoading,
    data: cData,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["comment_list"],
    queryFn: ({ pageParam = 1 }) => readSNSComment(pageParam, snsId), //첫 페이지 당 4개의 데이터 -> DB호출에서 4를 곱할 예정
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1; // 마지막 페이지가 될 때까지 / 1 * 4-> 2 * 4 -> 3 * 4 ...
    },
  });
  //좋아요
  const getHeart = async (
    snsId: string,
    snsUserId: string,
    myUserId: string,
    snsHeart: string[]
  ) => {
    //좋아요 (본인게시물이면 작동하지 않게)
    if (snsUserId !== myUserId) {
      if (snsHeart.indexOf(myUserId) !== -1) {
        //좋아요 한 사람 목록에 본인이 있으면 좋아요 삭제
        updateSNSHeart(snsId, myUserId, "-");
      } else {
        //좋아요 한 사람 목록에 본인이 없으면 좋아요 추가
        updateSNSHeart(snsId, myUserId, "+");
      }
    }
    set_snsHeart("clicked");
  };
  //댓글 작성 훅
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<{ commentText: string }>({ mode: "onSubmit" });
  //댓글 작성
  const onValid = async (value: { commentText: string }) => {
    await addSNSComment(snsId, value.commentText, userId, userEmail);
    reset();
    refetch();
  };
  return (
    <>
      <PostSection>
        <PostDescription>
          <span
            style={
              writerImg === "default"
                ? {
                    backgroundImage: `url('/defaultProfile.webp')`,
                  }
                : {
                    backgroundImage: `url('${writerImg}')`,
                  }
            }
          />
          <div>
            <Link href={`/userinfo/${writerData.info.userId}`}>
              <h5>{writerData.info.userEmail}</h5>
            </Link>
            <p>{writerData.info.snsText}</p>
          </div>
          <h4>{getDateTimeFormat(Number(writerData.info.createAt))}</h4>
        </PostDescription>
        {cData ? (
          <>
            {cData.pages[cData.pages.length - 1].map(
              (data: ICommentList, number: number) => (
                <PostDescription key={number}>
                  <CommentProfileImg userId={data.commentInfo.userId} />
                  <div>
                    <Link href="/userinfo">
                      <h5>{data.commentInfo.userEmail}</h5>
                    </Link>
                    <p>{data.commentInfo.commentText}</p>
                  </div>
                  <h4>
                    {getDateTimeFormat(Number(data.commentInfo.createAt))}
                  </h4>
                </PostDescription>
              )
            )}
          </>
        ) : (
          ""
        )}
      </PostSection>
      <Postinput>
        <PostHeart>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() =>
              getHeart(
                snsId,
                writerData.info.userId,
                userId,
                writerData.info.snsHeart
              )
            }
            fill={
              writerData.info.snsHeart.indexOf(userId) !== -1
                ? "#83c2f5"
                : "none"
            }
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

          <h4>좋아요{writerData.info.snsHeart.length}개</h4>
        </PostHeart>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            type="text"
            placeholder="댓글 작성"
            autoComplete="off"
            {...register("commentText", {
              required: true,
            })}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </Postinput>
    </>
  );
}
