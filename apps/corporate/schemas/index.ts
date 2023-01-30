import { JSONSchemaType } from 'ajv'

export interface HomeProps {
  content: Array<string>
}

export const homeSchema: JSONSchemaType<HomeProps> = {
  type: 'object',
  properties: {
    content: {
      type: 'array',
      items: { type: 'string' },
      minItems: 2,
      uniqueItems: true,
    },
  },
  required: ['content'],
  additionalProperties: false,
}

export interface AboutProps {
  title: string
  quote: string
  content: Array<string>
}

export const aboutSchema: JSONSchemaType<AboutProps> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    quote: { type: 'string' },
    content: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      uniqueItems: true,
    },
  },
  required: ['title', 'quote', 'content'],
  additionalProperties: false,
}

export type Link = {
  id: string
  title: string
  href: string
  text: string
}

export type Icon =
  | 'github'
  | 'twitter'
  | 'simon'
  | 'simon-alt'
  | 'analysis'
  | 'envelope'
  | 'fork'

export const iconSchema: JSONSchemaType<Icon> = {
  type: 'string',
  pattern: '^(github|twitter|simon|simon-alt|analysis|envelope|fork)$',
}

export type LinkIcon = {
  icon: string
} & Pick<Link, 'href' | 'title' | 'id'>

export const linkSchema: JSONSchemaType<Link> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    text: { type: 'string' },
    title: { type: 'string' },
    href: { type: 'string' },
  },
  required: ['text', 'title', 'href', 'id'],
  additionalProperties: false,
}

export const linkIconSchema: JSONSchemaType<LinkIcon> = {
  type: 'object',
  properties: {
    icon: iconSchema,
    id: { type: 'string' },
    title: { type: 'string' },
    href: { type: 'string' },
  },
  required: ['icon', 'title', 'href', 'id'],
  additionalProperties: false,
}

export interface ContactProps {
  title: string
  quote: string
  content: Array<string>
  contact: {
    links: Link[]
    information: string[]
  }
}

export const contactSchema: JSONSchemaType<ContactProps> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    quote: { type: 'string' },
    content: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      uniqueItems: true,
    },
    contact: {
      type: 'object',
      properties: {
        links: {
          type: 'array',
          items: linkSchema,
          minItems: 1,
          uniqueItems: true,
        },
        information: {
          type: 'array',
          items: { type: 'string' },
          minItems: 1,
          uniqueItems: true,
        },
      },
      required: ['information'],
      additionalProperties: false,
    },
  },
  required: ['title', 'quote', 'contact', 'content'],
  additionalProperties: false,
}

export interface ImpressumProps {
  title: string
  address: Array<string>
  vat: Array<string>
  contact: Array<string>
}

export const impressumSchema: JSONSchemaType<ImpressumProps> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    address: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      uniqueItems: true,
    },
    vat: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      uniqueItems: true,
    },
    contact: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      uniqueItems: true,
    },
  },
  required: ['title', 'address', 'vat', 'contact'],
  additionalProperties: false,
}

export interface ErrorProps {
  title: string
  quote: {
    content: Array<string>
    author: string
    cite: string
  }
  content: Array<string>
}

export const errorSchema: JSONSchemaType<ErrorProps> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    quote: {
      type: 'object',
      properties: {
        content: {
          type: 'array',
          items: { type: 'string' },
          minItems: 1,
          uniqueItems: true,
        },
        author: { type: 'string' },
        cite: { type: 'string' },
      },
      required: ['content', 'author', 'cite'],
      additionalProperties: false,
    },
    content: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      uniqueItems: true,
    },
  },
  required: ['title', 'quote', 'content'],
  additionalProperties: false,
}

export type Meta = {
  title?: string
  description?: string
  canonical?: string
  meta: {
    name?: {
      [x: string]: string
    }
    property?: {
      [x: string]: string
    }
  } | null
} | null

export const metaSchema: JSONSchemaType<Meta> = {
  type: 'object',
  properties: {
    title: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    canonical: { type: 'string', nullable: true },
    meta: {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          patternProperties: {
            '[a-z]*': { type: 'string' },
          },
          required: [],
          nullable: true,
          additionalProperties: false,
        },
        property: {
          type: 'object',
          patternProperties: {
            '[a-z]*': { type: 'string' },
          },
          required: [],
          nullable: true,
          additionalProperties: false,
        },
      },
      required: [],
      nullable: true,
      additionalProperties: false,
    },
  },
  required: [],
  nullable: true,
  additionalProperties: false,
}

export type Route = {
  name: string
  path: string
  meta: Meta | null
}

export const routeSchema: JSONSchemaType<Route> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    path: { type: 'string' },
    meta: metaSchema,
  },
  required: ['name', 'path'],
  additionalProperties: false,
}

export const routesSchema: JSONSchemaType<Route[]> = {
  type: 'array',
  items: routeSchema,
  minItems: 1,
  uniqueItems: true,
}

export interface HeaderProps {
  name: string
  title: Array<string>
  menu: {
    list: Array<Link>
  }
}

export const headerSchema: JSONSchemaType<HeaderProps> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    title: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      uniqueItems: true,
    },
    menu: {
      type: 'object',
      properties: {
        list: {
          type: 'array',
          items: linkSchema,
          minItems: 1,
          uniqueItems: true,
        },
      },
      required: ['list'],
      additionalProperties: false,
    },
  },
  required: ['name', 'title', 'menu'],
  additionalProperties: false,
}

export interface FooterProps {
  nav: {
    list: Array<LinkIcon>
  }
  menu: {
    list: Array<Link>
  }
}

export const footerSchema: JSONSchemaType<FooterProps> = {
  type: 'object',
  properties: {
    nav: {
      type: 'object',
      properties: {
        list: {
          type: 'array',
          items: linkIconSchema,
          minItems: 1,
          uniqueItems: true,
        },
      },
      required: ['list'],
      additionalProperties: false,
    },
    menu: {
      type: 'object',
      properties: {
        list: {
          type: 'array',
          items: linkSchema,
          minItems: 1,
          uniqueItems: true,
        },
      },
      required: ['list'],
      additionalProperties: false,
    },
  },
  required: ['nav', 'menu'],
  additionalProperties: false,
}

export interface PageProps {
  header: HeaderProps
  footer: FooterProps
}

export const pageSchema: JSONSchemaType<PageProps> = {
  type: 'object',
  properties: {
    header: headerSchema,
    footer: footerSchema,
  },
  required: ['header', 'footer'],
  additionalProperties: false,
}

export interface AppProps {
  origin: string
  routes: Route[]
  meta: Meta
}

export const appSchema: JSONSchemaType<AppProps> = {
  type: 'object',
  properties: {
    origin: { type: 'string' },
    routes: routesSchema,
    meta: metaSchema,
  },
  required: ['routes', 'meta', 'origin'],
  additionalProperties: false,
}
