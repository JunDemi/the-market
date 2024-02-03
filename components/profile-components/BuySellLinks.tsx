import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const BuySellLink = styled.div`
  display: flex;
  gap: 2rem;
  width: 70rem;
  margin: 0 auto 2rem auto;
  a {
    padding-top: 1.5rem;
    transition: 0.2s;
    &:focus {
      background-color: #dbdbdb;
    }
    span {
      padding: 10px 20px;
      font-size: 13px;
      border-radius: 30px;
    }
    hr {
      margin-top: 1rem;
      width: 2px;
      height: 2px;
      border: 2px solid;
      border-radius: 50%;
    }
  }
`;

export default function BuySellLinks() {
  const pathname = usePathname();
  return (
    <>
      <BuySellLink>
        <Link href="/profile/buyPage">
          <span
            style={
              pathname === "/profile/buyPage"
                ? { color: "#0062ff" }
                : { color: "#898989" }
            }
          >
            구매내역
          </span>
          {pathname === "/profile/buyPage" ? (
            <motion.hr
              layoutId="buy-sell"
              style={{ borderColor: "#0062ff", backgroundColor: "#0062ff" }}
            />
          ) : (
            <hr style={{ opacity: 0 }} />
          )}
        </Link>
        <Link href="/profile/sellPage">
          <span
            style={
              pathname === "/profile/sellPage"
                ? { color: "#ff006f" }
                : { color: "#898989" }
            }
          >
            판매내역
          </span>
          {pathname === "/profile/sellPage" ? (
            <motion.hr
              layoutId="buy-sell"
              style={{ borderColor: "#ff006f", backgroundColor: "#ff006f" }}
            />
          ) : (
            <hr style={{ opacity: 0 }} />
          )}
        </Link>
      </BuySellLink>
    </>
  );
}
