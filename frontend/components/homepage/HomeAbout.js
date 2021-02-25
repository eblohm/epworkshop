import React from 'react';
import styled from 'styled-components';
import { HomeHeadingStyles } from './HomeProducts';

const HomeAboutStyles = styled.section`
  background-color: var(--black);
  padding: 6rem 0;
  text-align: center;
  margin-bottom: 1rem;

  iframe {
    max-width: 100%;
  }
`;

const HeadingOnDarkBG = styled(HomeHeadingStyles)`
  color: var(--white);
`;

const VideoTitle = styled.h3`
  color: var(--white);
  font-style: italic;
  margin-bottom: 0.5rem;
`;

function HomeAbout() {
  return (
    <HomeAboutStyles>
      <HeadingOnDarkBG>Latest Video</HeadingOnDarkBG>
      <VideoTitle>Galaxy Resin Painting</VideoTitle>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/MMB6uX7roBE"
        frameBorder="0"
        title="Galaxy Resin Painting"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </HomeAboutStyles>
  );
}

export default HomeAbout;
