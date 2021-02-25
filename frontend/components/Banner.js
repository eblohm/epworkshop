import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const BannerStyles = styled.div`
  background-image: url('https://res.cloudinary.com/dai79rrxz/image/upload/v1613166309/banner-bg_nyomly.png');
  background-position: center;
  background-size: cover;
  height: 100vh;
  position: relative;

  .banner-text {
    position: absolute;
    left: 50%;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);

    h2 {
      color: var(--white);
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: 2rem;

      @media screen and (min-width: 400px) {
        font-size: 3rem;
      }

      @media screen and (min-width: 600px) {
        font-size: 4rem;
      }
    }

    button {
      background: transparent;
      border: 2px solid var(--white);
      border-radius: 4px;
      color: var(--white);
      font-size: 1.9rem;
      font-weight: 600;
      padding: 1rem;

      @media screen and (min-width: 400px) {
        font-size: 2.4rem;
        padding: 1rem 2rem;
      }

      @media screen and (min-width: 600px) {
        padding: 1rem 3rem;
      }

      a {
        color: var(--white);
        text-decoration: none;
      }
    }
  }
`;

function Banner() {
  return (
    <BannerStyles>
      <div className="banner-text">
        <h2>Handmade in the Mitten</h2>
        <button type="button">
          <Link href="/products">Shop Now</Link>
        </button>
      </div>
    </BannerStyles>
  );
}

export default Banner;
