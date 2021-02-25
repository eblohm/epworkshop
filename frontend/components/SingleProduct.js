import gql from 'graphql-tag';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';
import InternalBanner from './InternalBanner';
import Container from './Container';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import { useUser } from './User';

const ProductStyles = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-auto-columns: 1fr;
  align-items: top;
  gap: 2rem;

  @media screen and (min-width: 600px) {
    grid-auto-flow: column;
  }

  img {
    width: 100%;
    object-fit: contain;
  }

  .details {
    h2,
    p {
      margin-bottom: 2rem;
    }
  }
`;

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const user = useUser();
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { Product: product } = data;

  return (
    <>
      <Head>
        <title>{product.name} | EP Workshop</title>
      </Head>
      <InternalBanner />
      <Container>
        <ProductStyles>
          <img
            src={product.photo.image.publicUrlTransformed}
            alt={product.name}
          />
          <div className="details">
            <h2>
              {product.name} - {formatMoney(product.price)}
            </h2>
            <p>{product.description}</p>
            {user ? (
              <AddToCart id={product.id} />
            ) : (
              <p>You must be signed in to add a product to your cart!</p>
            )}
          </div>
        </ProductStyles>
      </Container>
    </>
  );
}
