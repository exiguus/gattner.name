import merge from './merge'
import { sortObject } from '.'
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
