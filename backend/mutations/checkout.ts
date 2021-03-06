import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import stripeConfig from "../lib/stripe";

interface Arguments {
  token: string;
}

const graphql = String.raw;

export default async function checkout(root: any, { token }: Arguments, context: KeystoneContext): Promise<OrderCreateInput> {
  // make sure they're signed in
  const userId = context.session.itemId;

  if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!');
  }

  // query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          shippingCost
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });
  // calculate total price for the order
  const cartItems = user.cart.filter((cartItem: CartItemCreateInput) => cartItem.product);
  const amount = cartItems.reduce(function(tally: number, cartItem: CartItemCreateInput): number {
    return tally + cartItem.quantity * cartItem.product.price + cartItem.quantity * cartItem.product.shippingCost;
  }, 0);
  const shipping = cartItems.reduce(function(tally: number, cartItem: CartItemCreateInput): number {
    return tally + cartItem.quantity * cartItem.product.shippingCost;
  }, 0);
  // create the charge with stripe library
  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  }).catch(err => {
    throw new Error(err.message);
  });

  // convert the cart items to order items
  const orderItems = cartItems.map(cartItem => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      shippingPrice: cartItem.product.shippingCost,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });

  // create the order and return it
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      shippingCost: shipping,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });

  // clean up old cart items
  const cartItemIds = user.cart.map(cartItem => cartItem.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds
  });

  return order;
}
