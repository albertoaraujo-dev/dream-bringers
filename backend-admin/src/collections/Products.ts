import { CollectionConfig, AccessArgs } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Produto',
    plural: 'Produtos',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['image', 'name', 'product_code', 'price', 'createdAt', 'updatedAt'],
    group: 'Estrutura do Produto',
    description: 'Cadastro de produtos com precificação e controle de estoque (SKU).',
  },
  access: {
    create: ({ req }) => req.user?.role === 'admin',
    read: () => true, // Leitura pública é necessária para o Cardápio Online.
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'createdAt',
      label: 'Data de Criação',
      type: 'date',
      admin: {
        hidden: true, // Oculta o campo no formulário de edição, pois ele é automático
      },
    },
    {
      name: 'updatedAt',
      label: 'Última Atualização',
      type: 'date',
      admin: {
        hidden: true, // Oculta o campo no formulário de edição, pois ele é automático
      },
    },
    {
      name: 'store',
      label: 'Loja Proprietária',
      type: 'relationship',
      relationTo: 'stores',
      required: true, // É obrigatório que um produto pertença a uma loja
      // Configuração administrativa
      // @ts-ignore
      admin: {
        position: 'sidebar', // Coloca o campo na barra lateral para destaque
      },
      access: {
        // Apenas admins podem alterar a loja proprietária
        update: ({ req }: AccessArgs) => req.user?.role === 'admin',
      },
      // Configuração para popular o campo automaticamente com a loja do usuário (se houver)
      defaultValue: ({ user }) => {
        if (user && user.store) {
          return user.store // Define o valor padrão com o ID da loja do usuário
        }
        return undefined
      },
    },
    {
      name: 'image',
      label: 'Imagem do Produto',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'name',
      label: 'Nome do Produto',
      type: 'text',
      required: true,
    },
    {
      name: 'product_code',
      label: 'Código do Produto (SKU)',
      type: 'text',
      unique: true, // Garante que cada produto tenha um código de estoque único.
      required: true,
    },
    {
      name: 'description',
      label: 'Descrição Detalhada',
      type: 'textarea',
    },
    {
      name: 'price',
      label: 'Preço de Venda (R$)',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'relationship',
      relationTo: 'categories',
      required: false, // Opcional no cadastro
      admin: {
        placeholder: 'Sem Categoria',
      },
    },
    {
      name: 'line',
      label: 'Linha',
      type: 'relationship',
      relationTo: 'lines',
      required: false, // Opcional no cadastro
      admin: {
        placeholder: 'Sem Categoria',
      },
    },
    {
      name: 'status',
      label: 'Status do Produto',
      type: 'select',
      options: [
        { label: 'Inativo', value: 'inactive' },
        { label: 'Ativo', value: 'active' },
      ],
      defaultValue: 'active',
      required: true,
      // Cardápio Online e PDV só tem acesso ao 'published'.
    },
  ],
  timestamps: true,
}
