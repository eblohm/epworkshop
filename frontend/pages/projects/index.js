import { useRouter } from 'next/router';
import InternalBanner from '../../components/InternalBanner';
import { ProjectPagination } from '../../components/Pagination';
import Projects from '../../components/Projects';

export default function ProductsPage() {
  const router = useRouter();
  const page = parseInt(router.query.page);

  return (
    <div>
      <InternalBanner />
      <Projects page={page || 1} />
      <ProjectPagination page={page || 1} />
    </div>
  );
}
