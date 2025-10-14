import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
    group: 'Usuários',
  },
  auth: true,
  fields: [
    // Email é adicionado por padrão pelo 'auth: true'
    {
      name: 'role', // Controle de acesso
      type: 'select',
      defaultValue: 'user',
      required: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Usuário',
          value: 'user',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
