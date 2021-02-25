import Head from 'next/head';
import InternalBanner from '../components/InternalBanner';
import ContactForm from '../components/ContactForm';
import Container from '../components/Container';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | EP Workshop</title>
      </Head>
      <InternalBanner />
      <Container>
        <ContactForm />
      </Container>
    </>
  );
}
