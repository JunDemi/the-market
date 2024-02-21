import { getDateTimeFormat } from "@/services/getDay";
import Link from "next/link";
import styled from "styled-components";
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
  div{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.7rem;
    h5{
        font-weight: bold;
        color: #06002a;
        font-size: 13px;
    }
    p{
        font-size: 12px;
        max-width: 200px;
        line-height: 1rem;
    }
  }
  h4{
    color: #939393;
    flex-grow: 1;
    font-size: 12px;
    padding-top: 1.1rem;
    text-align: right;
  }
`;
//styled component
export default function SNSComment({
  writerData,
  writerImg,
}: {
  writerData: ISNSList;
  writerImg: string;
}) {
  return (
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
            <Link href={`/userinfo/${writerData.info.userId}`}><h5>{writerData.info.userEmail}</h5></Link>
            <p>{writerData.info.snsText}</p>
        </div>
        <h4>{getDateTimeFormat(Number(writerData.info.createAt))}</h4>
      </PostDescription>
      {[...Array(8)].map((data, number) => (
        <PostDescription key={number}>
        <span style={{ backgroundImage: `url('/defaultProfile.webp')`, }}/>
        <div>
            <Link href="/userinfo"><h5>lovefls19@naver.com</h5></Link>
            <p>예쁜 사진들이네요!!</p>
        </div>
        <h4>2024-06-05 ( 12시 00분 )</h4>
      </PostDescription>
      ))}
    </PostSection>
  );
}
