import Head from 'next/head';
import InternalBanner from '../components/InternalBanner';
import Container from '../components/Container';
import PleaseSignIn from '../components/PleaseSignIn';
import Account from '../components/Account';

export default function AccountPage() {
  return (
    <div>
      <Head>
        <title>Account | EP Workshop</title>
      </Head>
      <InternalBanner />
      <PleaseSignIn>
        <Container>
          <Account />
        </Container>
      </PleaseSignIn>
    </div>
  );
}
