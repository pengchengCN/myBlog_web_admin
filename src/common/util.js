import { Message } from 'element-ui'
class Util {
 // 所有提示框方法
 // type: 类型，info(消息) success(成功) warning(警告) error(错误)
 // text: 显示文字
 messageMethod (type, text) {
  Message({
    duration: 3000,
    type: type,
    message: text
  })
}
}

export default new Util()