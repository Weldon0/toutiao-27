import { Notify } from 'vant'

import { curry } from 'lodash'

const createNotify = curry((type, message) => {
  return Notify({
    type,
    message
  })
})

function Show () {
  console.log(new.target)
}

const a = Show()
console.log(a)

const warningShow = createNotify('warning')
warningShow('提示消息')

// createNotify('danger')('提示信息')

// const warningShow = createNotify('warning')
// createNotify('danger')('提示')
// const dangerShow = createNotify('danger')
//
// dangerShow('提示')

// warningShow('提示')

// 函数柯里化
// 闭包
//
//
// Notify({
//   type: 'danger',
//   message: '提示'
// })

// function showDanger (message) {
//   Notify({
//     type: 'danger',
//     message
//   })
// }
//
// function showWarning (message) {
//   Notify({
//     type: 'warning',
//     message
//   })
// }
// function showSuccess (message) {
//   Notify({
//     type: 'success',
//     message
//   })
// }

// const createNotify = curry((type, message) => Notify({ type, message }), 2)
// export const createDangerNotify = createNotify('danger')
// export const createWarningNotify = createNotify('warning')
// export const createSuccessNotify = createNotify('success')

// function match (reg, str) {
//   return str.match(reg)
// }
//
// const regMath = curry(match)
//
// const matchNumber = regMath(/\d/)
// regMath()
//
// console.log(matchNumber(1))
//
// console.log(match(/\d/, 1))
// console.log(match(/\d/, 2))
// console.log(match(/\d/, 3))
