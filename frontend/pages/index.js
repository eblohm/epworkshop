import Head from 'next/head';
import Banner from '../components/Banner';
import Container from '../components/Container';
import HomeProducts from '../components/homepage/HomeProducts';
import HomeAbout from '../components/homepage/HomeAbout';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>EP Workshop | Handmade in the Mitten</title>
      </Head>
      <Banner />
      <Container>
        <HomeProducts />
      </Container>
      <HomeAbout />
    </>
  );
}
