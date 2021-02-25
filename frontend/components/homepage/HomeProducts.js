import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { ALL_PRODUCTS_QUERY } from '../Products';
import Product from '../Product';

export const HomeHeadingStyles = styled.h2`
  text-align: center;
  margin: 2rem 0;
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 60px;

  @media screen and (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default function HomeProducts() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      first: 3,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <HomeHeadingStyles>Latest Products</HomeHeadingStyles>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
