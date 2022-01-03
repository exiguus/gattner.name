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

export const iconSchema: JSONSchemaType<Icon> = {
  type: 'string',
  pattern: '^(github|twitter|simon|simon-alt|analysis|envelope)$',
}

export type LinkIcon = {
  title: string
  href: string
  icon: string
}

export const linkSchema: JSONSchemaType<Link> = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    title: { type: 'string' },
    href: { type: 'string' },
  },
  required: ['text', 'title', 'href'],
  additionalProperties: false,
}

export const linkIconSchema: JSONSchemaType<LinkIcon> = {
  type: 'object',
  properties: {
    icon: iconSchema,
    title: { type: 'string' },
    href: { type: 'string' },
  },
  required: ['icon', 'title', 'href'],
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

type Route = {
  name: string
  path: string
}

export const routeSchema: JSONSchemaType<Route> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    path: { type: 'string' },
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
  title: string
  menu: {
    list: Array<Link>
  }
}

export const headerSchema: JSONSchemaType<HeaderProps> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    title: { type: 'string' },
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
  name: string
  title: string
  description: string
  keywords: string
  routes: Route[]
}

export const appSchema: JSONSchemaType<AppProps> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    keywords: { type: 'string' },
    routes: routesSchema,
  },
  required: ['title', 'name', 'description', 'keywords', 'routes'],
  additionalProperties: false,
}