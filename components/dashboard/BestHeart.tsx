import styled from "styled-components";

//styled
const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem 1rem 1rem 1rem; 
  h1 {
    font-size: 16px;
    font-weight: bold;
  }
  h2 {
    font-size: 12px;
    margin-top: 1.5rem;
    color: #787878;
  }
  h3 {
    margin-top: 4rem;
    font-size: 30px;
    color: #0c7df6;
  }
`;
//styled
export default function BestHeart() {
  return <Container>
    <h1>베스트 좋아요</h1>
    <h2>SNS에서 좋아요를 가장 많이 받은 순</h2>
  </Container>;
}
