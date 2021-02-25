import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

// at it's simplest access control is yes or no value
export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}
const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('wes');
  },
};

// rule based functions - return either a boolean (y/n), or filters to limit what they can do
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // do they have the permission?
    if(!isSignedIn({ session })) {
      return false;
    }
    if(!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // if not, do they own the product?
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if(!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // should only see available products otherwise (based on status field)
    return { status: 'AVAILABLE' };
  },
  canOrder({ session }: ListAccessArgs) {
    // do they have the permission?
    if(!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // if not, do they own the product?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    // do they have the permission?
    if(!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // if not, do they own the product?
    return { order: { user: { id: session.itemId } } };
  },
  canManageUsers({ session }: ListAccessArgs) {
    // do they have the permission?
    if(!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // if not, they may only update themselves
    return { id: session.itemId };
  },
};
