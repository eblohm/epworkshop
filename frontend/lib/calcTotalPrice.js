export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally;
    return (
      tally +
      cartItem.quantity * cartItem.product.price +
      cartItem.quantity * cartItem.product.shippingCost
    );
  }, 0);
}
