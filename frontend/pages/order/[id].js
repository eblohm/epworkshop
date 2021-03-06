import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import ErrorMessage from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';
import InternalBanner from '../../components/InternalBanner';
import Container from '../../components/Container';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      shippingCost
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        shippingPrice
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function SingleOrderPage({ query }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id: query.id,
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
        <ErrorMessage error={error} />
      </Container>
    );

  const { order } = data;

  return (
    <>
      <Head>
        <title>EP Workshop - View Order</title>
      </Head>
      <InternalBanner />
      <OrderStyles>
        <p>
          <span>Order ID:</span>
          <span>{order.id}</span>
        </p>
        <p>
          <span>Charge:</span>
          <span>{order.charge}</span>
        </p>
        <p>
          <span>Shipping:</span>
          <span>{formatMoney(order.shippingCost)}</span>
        </p>
        <p>
          <span>Order Total:</span>
          <span>{formatMoney(order.total)}</span>
        </p>
        <p>
          <span>Item Count:</span>
          <span>{order.items.length}</span>
        </p>
        <div className="items">
          {order.items.map((item) => (
            <div className="order-item" key={item.id}>
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.title}
              />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>Qty: {item.quantity}</p>
                <p>Each: {formatMoney(item.price)}</p>
                <p>Shipping Per: {formatMoney(item.shippingPrice)}</p>
                <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </OrderStyles>
    </>
  );
}
