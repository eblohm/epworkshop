import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { projectsPerPage } from '../config';
import Container from './Container';
import ProjectCard from './ProjectCard';

export const ALL_PROJECTS_QUERY = gql`
  query ALL_PROJECTS_QUERY($skip: Int = 0, $first: Int) {
    allProjects(first: $first, skip: $skip, sortBy: dateAdded_DESC) {
      id
      name
      description
      photo {
        image {
          publicUrlTransformed(
            transformation: {
              width: "500"
              quality: "100"
              fetch_format: "webp"
            }
          )
        }
      }
    }
  }
`;

const ProjectsStyles = styled.section`
  h1 {
    text-align: center;
  }

  .projects {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 6rem;
    margin: 2rem 0;

    @media screen and (min-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

function Projects({ page }) {
  const { data, loading, error } = useQuery(ALL_PROJECTS_QUERY, {
    variables: {
      skip: page * projectsPerPage - projectsPerPage,
      first: projectsPerPage,
    },
  });

  if (loading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  if (error)
    return (
      <Container>
        <p>Oh no, there was an error loading the projects! Please try again.</p>
      </Container>
    );

  return (
    <Container>
      <ProjectsStyles>
        <h1>Projects</h1>
        <div className="projects">
          {data.allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </ProjectsStyles>
    </Container>
  );
}

export default Projects;
