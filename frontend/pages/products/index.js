import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';
import InternalBanner from '../../components/InternalBanner';

export default function ProductsPage() {
  const router = useRouter();
  const page = parseInt(router.query.page);
  return (
    <div>
      <InternalBanner />
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
