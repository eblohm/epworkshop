import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import nProgress from 'nprogress';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useCart } from '../lib/cartState';
import { useUser, CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CheckoutButton = styled.button`
  background: black;
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      shippingCost
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const user = useUser();
  const router = useRouter();
  const { closeCart } = useCart();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleResponse = (status, msg) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg },
      });
    } else {
      setStatus({
        info: { error: true, msg },
      });
    }
  };

  async function handleSubmit(e) {
    // stop the form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true);
    // start page transition
    nProgress.start();
    // create payment method via stripe, get token
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    // handle errors from stripe, if any
    if (error) {
      setError(error);
      nProgress.done();
      return; // stop the checkout from moving forward
    }
    // send token from stripe to our keystone server
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    // send the emails here
    const dataForEmail = {
      data: order.data.checkout,
      user,
    };

    console.log(dataForEmail);
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    // Send the email to admins
    const resToAdmin = await fetch('/api/sendordertoadmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForEmail),
    });
    const textToAdmin = await resToAdmin.text;
    handleResponse(resToAdmin.status, textToAdmin);

    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    // Send the email to customer
    const resToCustomer = await fetch('/api/sendordertocustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForEmail),
    });
    const textToCustomer = await resToCustomer.text;
    handleResponse(resToCustomer.status, textToCustomer);

    // change the page to view the order
    router.push({
      pathname: `/order/[id]`,
      query: { id: order.data.checkout.id },
    });

    // close the cart
    closeCart();

    // turn the loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <CheckoutButton disabled={loading} aria-busy={loading}>
        Check{loading ? 'ing' : ''} Out Now
      </CheckoutButton>
    </CheckoutFormStyles>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
