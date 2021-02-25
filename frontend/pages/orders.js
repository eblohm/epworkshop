import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import InternalBanner from '../components/InternalBanner';
import Container from '../components/Container';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderPageStyles = styled.div`
  h1,
  h2 {
    margin: 2rem 0;
    text-align: center;
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <ErrorMessage error={error} />;

  const { allOrders } = data;

  return (
    <OrderPageStyles>
      <Head>
        <title>Your Orders ({allOrders.length}) | EP Workshop</title>
      </Head>
      <InternalBanner />
      <h1>Orders</h1>
      <h2>You have {allOrders.length} orders!</h2>
      <Container>
        <OrderUl>
          {allOrders.map((order) => (
            <OrderItemStyles key={order.id}>
              <Link href={`/order/${order.id}`}>
                <a>
                  <div className="order-meta">
                    <p>
                      {countItemsInAnOrder(order)} Item
                      {countItemsInAnOrder(order) === 1 ? '' : 's'}
                    </p>
                    <p>
                      {order.items.length} Product
                      {order.items.length === 1 ? '' : 's'}
                    </p>
                    <p>{formatMoney(order.total)}</p>
                  </div>
                  <div className="images">
                    {order.items.map((item) => (
                      <img
                        key={item.id}
                        src={item.photo?.image?.publicUrlTransformed}
                        alt={item.name}
                      />
                    ))}
                  </div>
                </a>
              </Link>
            </OrderItemStyles>
          ))}
        </OrderUl>
      </Container>
    </OrderPageStyles>
  );
}
