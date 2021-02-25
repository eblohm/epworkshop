import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import { useUser } from './User';

export default function Product({ product }) {
  const user = useUser();
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <div className="buttonList">
        <PriceTag>{formatMoney(product.price)}</PriceTag>
        {user && <AddToCart id={product.id} />}
      </div>
    </ItemStyles>
  );
}
