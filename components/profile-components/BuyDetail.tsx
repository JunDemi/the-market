import styled from "styled-components";

const DetailContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 50rem;
    height: 80dvh;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
`;
export default function BuyDetail({ buyId }: { buyId: string }) {
  return <>
    <DetailContainer>
        {buyId}
    </DetailContainer>
  </>;
}
