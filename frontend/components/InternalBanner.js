import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const InternalBannerStyles = styled.div`
  background-image: url('https://res.cloudinary.com/dai79rrxz/image/upload/v1613166309/banner-bg_nyomly.png');
  height: 205px;

  @media screen and (min-width: 1300px) {
    height: 190px;
  }
`;

function InternalBanner() {
  return <InternalBannerStyles />;
}

export default InternalBanner;
