import styled from 'styled-components';

const ItemStyles = styled.div`
  background: white;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid var(--lightGray);
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    & > * {
      background: white;
      border: 0;
      padding: 1rem;
    }

    .btn-add-to-cart {
      font-size: 1.6rem;
      text-align: left;
    }
  }
`;

export default ItemStyles;
