import { Notify } from 'vant'

export function MyNotifyDanger (message) {
  Notify({
    type: 'danger',
    message
  })
}
