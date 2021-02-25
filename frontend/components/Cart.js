import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import RemoveFromCart from './RemoveFromCart';
import Checkout from './Checkout';

const CartHeader = styled.h3`
  display: inline-block;
  padding: 4px 5px;
  margin: 0;
  font-size: 4rem;
`;

const CartItemStyles = styled.li`
  display: grid;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--grey);
  grid-template-columns: 1fr;
  width: 100%;

  @media screen and (min-width: 500px) {
    grid-template-columns: auto 1fr auto;
  }

  img {
    margin: 0 auto;

    @media screen and (min-width: 500px) {
      margin-right: 1rem;
    }
  }

  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const product = cartItem.product;

  if (!product) return null;

  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} -{' '}
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!me) {
    return null;
  }

  return (
    <CartStyles open={cartOpen}>
      <header>
        <CartHeader>Your Cart</CartHeader>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>Total - {formatMoney(calcTotalPrice(me.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}
