import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const FooterStyles = styled.footer`
  background-color: var(--black);
  color: var(--white);
  padding: 3rem 0;

  .footer-inside {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    margin: 0 auto;
    width: 95%;

    @media screen and (min-width: 530px) {
      grid-template-columns: 1fr 1fr;
    }

    .custom-footer {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      text-align: center;

      @media screen and (min-width: 530px) {
        align-items: flex-start;
        text-align: left;
      }

      a {
        color: var(--white);
      }
    }

    #logos {
      text-align: center;

      @media screen and (min-width: 530px) {
        text-align: right;
      }

      .socials {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        width: 182px;

        @media screen and (min-width: 530px) {
          margin-left: auto;
          margin-right: 0;
        }

        a {
          color: var(--white);
        }
      }
    }
  }
`;

function Footer() {
  return (
    <FooterStyles>
      <div className="footer-inside">
        <section className="custom-footer">
          <p>
            Looking for a custom piece?
            <br />
            We're ready to make whatever you need.
          </p>
          <Link href="/contact">Contact Us</Link>
        </section>
        <section id="logos">
          <img
            src="https://res.cloudinary.com/dai79rrxz/image/upload/v1613615949/epworkshop-logo-white_nimyga.png"
            alt="EP Workshop"
          />
          <div className="socials">
            <a
              href="https://www.facebook.com/philipanthonydesigns"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FacebookIcon style={{ fontSize: '30px' }} />
            </a>
            <a
              href="https://www.instagram.com/epworkshop/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <InstagramIcon style={{ fontSize: '30px' }} />
            </a>
            {/* <a
            href="https://www.youtube.com/channel/UCUf4XXRAlLZ0E1nFJu0VTHg"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a> */}
          </div>
        </section>
      </div>
    </FooterStyles>
  );
}

export default Footer;
