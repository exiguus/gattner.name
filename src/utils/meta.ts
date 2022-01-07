import merge from './merge'
import { Meta } from '../../schemas'
import { DocumentMetaProps } from 'react-document-meta'

export const getDocumentMeta = (...args: Meta[]): DocumentMetaProps => {
  let documentMeta = {}
  args.forEach(arg => {
    if (arg != null) {
      documentMeta = merge(arg, documentMeta)
    }
  })
  return sortObject(documentMeta)
}

const sortObject = (obj: Record<string, unknown>): Record<string, unknown> => {
  return Object.keys(obj)
    .sort()
    .reduce(
      (r, k) =>
        Object.assign(r, {
          [k]:
            typeof obj[k] === 'object' && obj[k] !== null
              ? sortObject(obj[k] as unknown as Record<string, unknown>)
              : obj[k],
        }),
      {}
    )
}
