import Head from 'next/head';
import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Container from '../components/Container';
import InternalBanner from '../components/InternalBanner';
import { useUser } from '../components/User';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const SignInStyles = styled.div`
  margin: 2rem auto;
  width: 80%;
`;

export default function SignInPage() {
  const user = useUser();

  if (user) {
    return (
      <>
        <Head>
          <title>Already Signed In | EP Workshop</title>
        </Head>
        <InternalBanner />
        <Container>
          <p>You are already signed in!</p>
        </Container>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Sign In | EP Workshop</title>
      </Head>
      <InternalBanner />
      <SignInStyles>
        <GridStyles>
          <SignIn />
          <SignUp />
          <RequestReset />
        </GridStyles>
      </SignInStyles>
    </>
  );
}
