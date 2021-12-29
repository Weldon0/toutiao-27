// 获取本地存储的方法
export const getItem = (key) => {
  const value = localStorage.getItem(key)

  try {
    // 如果解析报错就会走catch，直接返回结果
    // 如果不报错，说明可以解析成功，直接返回解析后的结果
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

export const setItem = (key, value) => {
  // 判断传进来的值是不是object，如果是object则进行stringify
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  // 写入操作
  localStorage.setItem(key, value)
}

export const removeItem = (key) => {
  localStorage.removeItem(key)
}
