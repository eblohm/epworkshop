import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
//import { insertSeedData } from './seed-data';
import 'dotenv/config';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { Order } from './schemas/Order';
import { OrderItem } from './schemas/OrderItem';
import { Role } from './schemas/Role';
import { sendPasswordResetEmail } from './lib/mail';
import { extendGraphqlSchema } from './mutations';
import { permissionsList } from './schemas/fields';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User', // customer, user, ...
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO add in initial roles
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity);
    }
  }
});

export default withAuth(config({
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL, process.env.PROD_FRONTEND_URL, process.env.PROD_FRONTEND_URL_2],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // async onConnect({ keystone }) {
    //   if (process.argv.includes('--seed-data')) {
    //     await insertSeedData(keystone);
    //   }
    // },
  },
  lists: createSchema({
    User,
    Product,
    ProductImage,
    CartItem,
    Order,
    OrderItem,
    Role,
  }),
  extendGraphqlSchema,
  ui: {
    // Show the UI only for people who only pass this test
    isAccessAllowed: ({ session }) => {
      return !!session?.data;
    },
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: `id name email role { ${permissionsList.join(' ')} }`,
  }),
}));
