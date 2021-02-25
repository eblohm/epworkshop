import Link from 'next/link';
import styled from 'styled-components';
import Cart from './Cart';
import Nav from './Nav';

const Logo = styled.div`
  margin-bottom: 1.6rem;

  @media screen and (min-width: 1200px) {
    margin-bottom: 0;
    position: absolute;
    left: 50%;
    top: 2rem;
    transform: translateX(-50%);
  }

  img {
    cursor: pointer;
    max-width: 80%;
    height: auto;
    width: 250px;

    @media screen and (min-width: 1200px) {
      width: 350px;
    }
  }
`;

const HeaderStyles = styled.header`
  background: rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-columns: 1fr;
  padding: 3rem 0;
  height: 205px;
  position: fixed;
  text-align: center;
  width: 100%;
  z-index: 99999;

  @media screen and (min-width: 1200px) {
    height: 190px;
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <Logo>
        <Link href="/">
          <img
            src="https://res.cloudinary.com/dai79rrxz/image/upload/v1613166191/logo_soxfea.png"
            alt="EP Workshop"
          />
        </Link>
      </Logo>
      <Nav />
      <Cart />
    </HeaderStyles>
  );
}
