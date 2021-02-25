import Link from 'next/link';
import styled from 'styled-components';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SignOut from './SignOut';
import { useUser } from './User';
import { useCart } from '../lib/cartState';

const NavStyles = styled.nav`
  @media screen and (min-width: 1200px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
    margin-right: 2rem;
  }

  i {
    color: var(--white);
  }

  a {
    color: var(--white);
    text-decoration: none;
    text-transform: uppercase;

    &:not(:last-child) {
      margin-right: 2rem;

      @media screen and (min-width: 400px) {
        margin-right: 3rem;
      }

      @media screen and (min-width: 600px) {
        margin-right: 4rem;
      }

      @media screen and (min-width: 800px) {
        margin-right: 5rem;
      }
    }
  }

  button {
    background: transparent;
    border: none;
    font-size: 1.6rem;
  }

  .menu-icon {
    color: var(--white);
    height: 25px;
    width: auto;
  }
`;

const NavDropDownStyles = styled.ul`
  display: inline-block;
  margin-right: 2rem;

  @media screen and (min-width: 400px) {
    margin-right: 3rem;
  }

  @media screen and (min-width: 600px) {
    margin-right: 4rem;
  }

  @media screen and (min-width: 800px) {
    margin-right: 5rem;
  }

  li {
    position: relative;
    ul {
      display: none;
    }

    &:hover {
      ul {
        background: rgba(0, 0, 0, 0.3);
        display: block;
        position: absolute;
        right: 50%;
        transform: translate(50%);
        width: 120px;
        text-align: center;

        a,
        button {
          margin-right: 0;
          padding: 1rem;
          display: block;
          border-bottom: 1px solid var(--white);
        }

        button {
          background: transparent;
          border: none;
          color: var(--white);
          font-size: 1.6rem;
          text-transform: uppercase;
          width: 100%;
          cursor: pointer;
        }
      }
    }
  }
`;

const SocialNavStyles = styled.nav`
  display: none;
  margin-right: 2.8rem;
  margin-bottom: 2rem;
  text-align: right;

  @media screen and (min-width: 1200px) {
    display: block;
  }

  a {
    &:first-child {
      margin-right: 2rem;
    }
  }

  .menu-icon {
    color: var(--white);
  }
`;

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();

  return (
    <div>
      <SocialNavStyles>
        <a
          href="https://www.facebook.com/philipanthonydesigns"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FacebookIcon className="menu-icon" style={{ fontSize: '25px' }} />
        </a>
        <a
          href="https://www.instagram.com/epworkshop/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <InstagramIcon className="menu-icon" style={{ fontSize: '25px' }} />
        </a>
      </SocialNavStyles>
      <NavStyles>
        <Link href="/">Home</Link>
        <Link href="/products">Shop</Link>
        <Link href="/contact">Contact</Link>
        {user && (
          <>
            <NavDropDownStyles>
              <li>
                <PersonIcon
                  style={{ fontSize: '25px' }}
                  className="menu-icon"
                />
                <ul>
                  <Link href="/account">Account</Link>
                  <Link href="/orders">Orders</Link>
                  <SignOut />
                </ul>
              </li>
            </NavDropDownStyles>

            <button type="button" onClick={openCart}>
              <ShoppingCartIcon
                className="menu-icon"
                style={{ fontSize: '25px' }}
              />
            </button>
          </>
        )}
        {!user && (
          <>
            <Link href="/signin">Sign In</Link>
          </>
        )}
      </NavStyles>
    </div>
  );
}
