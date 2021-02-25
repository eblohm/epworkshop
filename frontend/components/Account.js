import React from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { useUser, CURRENT_USER_QUERY } from './User';
import useForm from '../lib/useForm';
import RequestReset from './RequestReset';

const UPDATE_USER_INFORMATION = gql`
  mutation UPDATE_USER_INFO(
    $id: ID!
    $name: String
    $email: String
    $address: String
  ) {
    updateUser(
      id: $id
      data: { name: $name, email: $email, address: $address }
    ) {
      id
    }
  }
`;

const FormStyles = styled.form`
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  fieldset {
    border: none;

    label {
      display: block;
      margin-bottom: 2rem;

      &.first-label {
        margin-top: 2rem;
      }

      span {
        display: inline-block;
        margin-bottom: 0.5rem;
      }
    }

    input,
    select,
    textarea {
      display: block;
      font-family: 'Gotham Pro', sans-serif;
      font-size: 1.4rem;

      padding: 0.5rem;
      width: 100%;
    }

    input,
    textarea {
      border: 1px solid var(--grey);
      border-radius: 5px;
    }

    textarea {
      height: 100px;
      resize: none;
    }

    .italic {
      font-style: italic;
      font-size: 1.3rem;
    }

    button {
      background-color: var(--black);
      border-radius: 2px;
      border: none;
      color: var(--white);
      font-size: 1.6rem;
      padding: 1rem;
    }
  }
`;

function Account() {
  const user = useUser();
  const { inputs, handleChange, resetForm } = useForm({
    email: user.email,
    name: user.name,
    address: user.address,
  });

  const [updateUser, { data, loading, error }] = useMutation(
    UPDATE_USER_INFORMATION
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await updateUser({
      variables: {
        id: user.id,
        name: inputs.name,
        email: inputs.email,
        address: inputs.address,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });
  }

  return (
    <div>
      <FormStyles method="post" onSubmit={handleSubmit}>
        <h1>Edit Your Account</h1>
        <fieldset>
          <label htmlFor="name">
            Name
            <input
              type="name"
              name="name"
              placeholder="Name"
              autoComplete="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="address">
            Address
            <textarea
              name="address"
              placeholder="Address"
              value={inputs.address}
              onChange={handleChange}
            />
            <p className="italic">We will ship orders to this address</p>
          </label>
          <button type="submit">Update Account</button>
        </fieldset>
      </FormStyles>
      <RequestReset />
    </div>
  );
}

export default Account;
