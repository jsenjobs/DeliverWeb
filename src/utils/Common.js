
const price = [2000, 1000, 500]
const desc = ['大桶', '中桶', '小桶']
exports.createTableItem = function(order) {
  let oData = {
    id: order._id,
    date: new Date(order.date).format('yy年MM月dd日 hh时mm分ss秒'),
    openid: order.openid,
    name: order.name,
    address: order.address,
    price: (price[order.type] * order.num / 100) + '元',
    introduce: '购买' + desc[order.type] + '饮用水' + order.num + '箱',
  }
  return oData
}
