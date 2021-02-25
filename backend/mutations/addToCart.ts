import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from "../types";

export default async function addToCart(root: any, { productId }: {productId: string}, context: KeystoneContext): Promise<CartItemCreateInput> {
  // query the user and see if they're signed in
  const sesh = context.session as Session;
  // query the users cart
  if(!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  // check if the item is already in their cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });

  // if it is, increment by 1
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    })
  }

  // if it isn't create a new cartitem
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    }
  })
}