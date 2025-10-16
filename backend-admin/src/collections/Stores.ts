import { AccessArgs, CollectionConfig } from 'payload'

export const Stores: CollectionConfig = {
  slug: 'stores',
  labels: {
    singular: 'Loja (Tenant)',
    plural: 'Lojas (Tenants)',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Estrutura da Loja',
    description: 'Cadastro das lojas que utilizam a plataforma (tenants).',
  },
  access: {
    // Apenas admins podem criar ou editar lojas
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
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      label: 'Nome da Loja',
      type: 'text',
      required: true,
    },
    {
      name: 'identifier',
      label: 'Identificador Único (Slug)',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        description: 'Usado na URL para identificar a loja (ex: "minha-loja-a").',
      },
    },
  ],
  timestamps: true,
}
