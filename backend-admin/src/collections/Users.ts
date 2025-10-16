import { Store } from '@/payload-types'
import { CollectionConfig, AccessArgs } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'store'],
    group: 'Configurações',
  },
  access: {
    read: ({ req }: AccessArgs) => {
      if (req.user?.role === 'admin') return true // Admins podem ver todos os usuários

      if (req.user?.role === 'gerente' && req.user?.store) {
        return {
          store: {
            equals: req.user.store,
          },
        }
      }

      return false
    },

    create: ({ req }: AccessArgs) => req.user?.role === 'admin' || req.user?.role === 'gerente',
    update: ({ req }: AccessArgs) => req.user?.role === 'admin' || req.user?.role === 'gerente',
    delete: ({ req }: AccessArgs) => req.user?.role === 'admin' || req.user?.role === 'gerente',
  },
  fields: [
    {
      name: 'role',
      label: 'Nível de Acesso',
      type: 'select',
      options: [
        { label: 'Administrador Global', value: 'admin' },
        { label: 'Gerente', value: 'gerente' },
        { label: 'Usuário Padrão', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      access: {
        // Apenas admins podem alterar o próprio nível de acesso de outro usuário
        update: ({ req }: AccessArgs) => req.user?.role === 'admin',
      },
    },
    {
      name: 'store',
      label: 'Loja',
      type: 'relationship',
      relationTo: 'stores',
      required: false, // Pode ser null para o Admin Global
      admin: {
        position: 'sidebar',
      },
      access: {
        // CORREÇÃO: Usa access.update para controlar a edição (lado do servidor).
        // Apenas admins podem alterar a Loja Associada.
        read: ({ req }: AccessArgs) => req.user?.role === 'admin',
        update: ({ req }: AccessArgs) => req.user?.role === 'admin',
      },
    },
  ],
  timestamps: true,
}
