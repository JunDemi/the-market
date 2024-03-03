import styled from "styled-components";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { readBuyList, readIDSNSList, readSNSList } from "@/services/firebaseCRUD";
import { useRecoilState } from "recoil";
import { isDeleteSNS } from "@/app/atom";
import { IBuyDetail, ISNSData } from "@/services/type";

//스타일 컴포넌트
export default function ContentsTotal({ userId }: { userId: string }) {
  const [close, ] = useRecoilState(isDeleteSNS); //sns삭제 시 리코일 신호를 전송하여 오버레이 닫기
  const [snsTotal, set_snsTotal] = useState<ISNSData[]>();
  const [buyTotal, set_buyTotal] = useState<IBuyDetail[]>();
  const [sellTotal, set_sellTotal] = useState<IBuyDetail[]>();
  useEffect(() => {
    readIDSNSList(userId)
      .then((res) => set_snsTotal(res))
      .catch((error) => console.log(error.message));
    readBuyList("buy", userId)
      .then((res) => set_buyTotal(res))
      .catch((error) => console.log(error.message));
    readBuyList("sell", userId)
      .then((res) => set_sellTotal(res))
      .catch((error) => console.log(error.message));
  }, [userId, close]);

  const total1 = buyTotal?.reduce(
    //총 구매액 계산
    (acc, data) => acc + Number(data.info.productPrice),
    0
  );
  const total2 = sellTotal?.reduce(
    //총 판매액 계산
    (acc, data) => acc + Number(data.info.productPrice),
    0
  );
  return (
    <>
      {snsTotal && buyTotal && sellTotal ? (
        <>
          <div>
            <h4>
              <CountUp end={snsTotal.length} duration={1.2} />개
            </h4>
            <p>작성한 게시물</p>
          </div>
          <div>
            <h4>
              <CountUp end={Number(total1)} duration={1.2} />원
            </h4>
            <p>총 구매액</p>
          </div>
          <div>
            <h4>
              <CountUp end={Number(total2)} duration={1.2} />원
            </h4>
            <p>총 판매액</p>
          </div>
        </>
      ) : null}
  </>
  );
}
