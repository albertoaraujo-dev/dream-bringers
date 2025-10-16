import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    group: 'Mídia',
  },
  access: {
    read: () => true,
  },
  upload: {
    disableLocalStorage: true, // Cloudinary
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
