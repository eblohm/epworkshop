import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, permissions, rules } from '../access';

export const Project = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
    isHidden: (args) => !permissions.canManageRoles(args),
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({ ui: { displayMode: 'textarea' } }),
    photo: relationship({
      ref: 'ProjectImage.project',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText', 'description'],
        inlineCreate: { fields: ['image', 'altText', 'description'] },
        inlineEdit: { fields: ['image', 'altText', 'description'] },
      },
      many: true,
    }),
    dateAdded: text({ defaultValue: Date.now().toString(), label: 'Timestamp this project was added, used for sorting. Do not enter anything in this field.' })
  },
});
