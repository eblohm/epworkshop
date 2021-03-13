import InternalBanner from '../components/InternalBanner';
import RequestReset from '../components/RequestReset';
import Container from '../components/Container';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <InternalBanner />
        <Container>
          <p>Sorry, you must supply a reset token.</p>
          <RequestReset />
        </Container>
      </>
    );
  }

  return (
    <>
      <InternalBanner />
      <Container>
        <p>Reset your password </p>
        <Reset token={query.token} />
      </Container>
    </>
  );
}
