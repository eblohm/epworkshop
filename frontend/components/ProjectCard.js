import styled from 'styled-components';
import Link from 'next/link';

const ProjectCardStyles = styled.div`
  border-radius: 12px;
  box-shadow: 0 0 10px var(--grey);
  padding: 1rem;
  text-align: center;

  a {
    align-items: center;
    color: var(--black);
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    text-decoration: none;

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;

      @media screen and (min-width: 800px) {
        font-size: 2.4rem;
      }
    }

    p {
      margin-top: 1.5rem;
      text-decoration: underline;
    }
  }
`;

function ProjectCard({ project }) {
  return (
    <ProjectCardStyles>
      <Link href={`/projects/${project.id}`}>
        <a>
          <h2>{project.name}</h2>
          {project.photo.length > 0 ? (
            <img
              src={project.photo[0].image.publicUrlTransformed}
              alt={project.name}
            />
          ) : (
            ''
          )}
          <p>More Information</p>
        </a>
      </Link>
    </ProjectCardStyles>
  );
}

export default ProjectCard;
