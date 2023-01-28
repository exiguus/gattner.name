import { isObject } from '@gattner/utils'
import { Action } from './types'

export const isActionValue = (
  actionValue: unknown
): actionValue is Action['value'] =>
  isObject(actionValue) &&
  'type' in actionValue &&
  typeof actionValue.type === 'string' &&
  'msg' in actionValue &&
  typeof actionValue.msg === 'string' &&
  'value' in actionValue &&
  typeof actionValue.value === 'string'

export const isAction = (action: unknown): action is Action =>
  isObject(action) &&
  'key' in action &&
  isObject(action.key) &&
  'value' in action &&
  isObject(action.value) &&
  'timestamp' in action.key &&
  typeof action.key.timestamp === 'number' &&
  'type' in action.value &&
  typeof action.value.type === 'string' &&
  'msg' in action.value &&
  typeof action.value.msg === 'string' &&
  'value' in action.value &&
  typeof action.value.value === 'string'
