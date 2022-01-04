import { Notify } from 'vant'
import { curry } from 'lodash'

const createNotify = curry((type, message) => Notify({ type, message }), 2)
export const createDangerNotify = createNotify('danger')
export const createWarningNotify = createNotify('warning')
export const createSuccessNotify = createNotify('success')
