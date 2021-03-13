import { useRef } from 'react';
import gql from 'graphql-tag';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import Slider from 'react-slick';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';
import InternalBanner from './InternalBanner';
import Container from './Container';

const ProjectStyles = styled.div`
  h2 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
  }
`;

const ProjectPhotoStyles = styled.div`
  .slide--inner {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media screen and (min-width: 1000px) {
      flex-direction: row;
    }

    img {
      width: 500px;

      @media screen and (min-width: 1200px) {
        width: auto;
      }
    }

    .slide-details {
      display: inline-block;
      margin-top: 3rem;

      @media screen and (min-width: 1000px) {
        margin-left: 3rem;
        margin-top: 0;
      }

      .slide-nav {
        text-align: center;

        button {
          background: var(--black);
          border: 1px solid var(--black);
          border-radius: 10px;
          color: var(--white);
          cursor: pointer;
          font-size: 1.7rem;
          padding: 0.5rem 1rem;

          &:hover {
            background: var(--white);
            border: 1px solid var(--grey);
            color: var(--black);
          }

          &:first-child {
            margin-right: 2rem;
          }
        }
      }
    }
  }
`;

export const SINGLE_PROJECT_QUERY = gql`
  query SINGLE_PROJECT_QUERY($id: ID!) {
    Project(where: { id: $id }) {
      id
      name
      description
      photo {
        altText
        description
        image {
          publicUrlTransformed(
            transformation: {
              width: "750"
              quality: "100"
              fetch_format: "webp"
            }
          )
        }
      }
    }
  }
`;

export default function SingleProject({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PROJECT_QUERY, {
    variables: {
      id,
    },
  });

  const slickRef = useRef();

  const handleClick = (option, e) => {
    e.preventDefault();

    if (option === 'prev') {
      slickRef.current.slickPrev();
    } else {
      slickRef.current.slickNext();
    }
  };

  if (loading)
    return (
      <>
        <InternalBanner />
        <Container>
          <p>Loading...</p>
        </Container>
      </>
    );
  if (error)
    return (
      <Container>
        <DisplayError error={error} />
      </Container>
    );

  const { Project: project } = data;
  const settings = {
    arrows: false,
  };

  return (
    <>
      <Head>
        <title>{project.name} | EP Workshop</title>
      </Head>
      <InternalBanner />
      <Container>
        <ProjectStyles>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <Slider {...settings} ref={slickRef}>
            {project.photo.map((photo) => (
              <ProjectPhotoStyles key={photo.image.publicUrlTransformed}>
                <div className="slide--inner">
                  <img
                    src={photo.image.publicUrlTransformed}
                    alt={photo.altText}
                  />

                  <div className="slide-details">
                    <p>{photo.description}</p>
                    {project.photo.length === 1 ? (
                      ''
                    ) : (
                      <div className="slide-nav">
                        <button
                          type="submit"
                          onClick={(e) => handleClick('prev', e)}
                        >
                          Prev
                        </button>
                        <button
                          type="submit"
                          onClick={(e) => handleClick('next', e)}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </ProjectPhotoStyles>
            ))}
          </Slider>
        </ProjectStyles>
      </Container>
    </>
  );
}
