// 处理dayjs事件的逻辑，同时注册全局过滤器处理时间问题
import dayjs from 'dayjs'
import Vue from 'vue'

// 引入中文语言包
import 'dayjs/locale/zh-cn'

// 引入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// 配置中文语言包
dayjs.locale('zh-cn')

Vue.filter('reTime', (value) => dayjs().to(dayjs(value)))
