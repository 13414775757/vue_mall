const sqlMap = {
  user: {
    //登录判断
    select: 'SELECT user_id, username, nickname FROM users',
    //注册
    register: 'INSERT INTO users(user_id, username, password, nickname, QQ, phone_num, email) VALUES(null, ?, ?, ?, ?, ?, ?)',
    //找回密码
    findPassword: '',
  },
  news: {
    newsList: 'SELECT id, title, content, time, seeTimes FROM news',
    updateSeeTimes: 'UPDATE news SET seeTimes = seeTimes + 1 WHERE id = ?',
    //根据外键联级查询
    newsAndComments: 'SELECT a.title, a.content, a.time, a.seeTimes,b.nickname, b.comment_id, b.id, b.comment_body, b.comment_time FROM news a LEFT JOIN  comments b ON a.id = b.id WHERE a.id = ?',
    addComment: 'INSERT INTO comments(id, nickname, comment_body) VALUES(?, ?, ?)',
    //发博客（新闻）
    getMaxId: 'SELECT MAX(id) AS max_id FROM news',
    sendNews: 'INSERT INTO news(id, title, content, time, seeTimes) VALUES(?, ?, ?, ?, ?)',
  },
  mall: {
    //加载商品
    loadGoods: 'SELECT goods_id, goods_price, goods_describe FROM goods_mall',
    //加载单个对应商品详细信息
    loadGoodsInfo: 'SELECT goods_price, goods_describe FROM goods_mall WHERE goods_id = ?',
    //获取样式表
    getStyle: 'SELECT style_id, color, size FROM style',

  },
  car: {
    //获取所有商品(order by car_id）根据id （desc）降序排序)
    getCarItem: 'SELECT car_id, item_price, item_describe, item_color, item_size, item_count, item_id, item_check FROM shop_car ORDER BY car_id DESC',
    //加入购物车
    addCarItem: 'INSERT INTO shop_car(car_id, item_price, item_describe, item_size, item_color, item_count, item_id ) VALUES(null, ?, ?, ?, ?, ?, ?)',
    //判断购物车中是否有相同商品
    ifItemHadExist: 'SELECT item_price, item_describe, item_color, item_size FROM shop_car WHERE item_id = ?',
    //相同商品数量+1
    updateItemCount: 'UPDATE shop_car SET item_count = item_count + 1 WHERE item_describe = ? AND item_color = ? AND item_size = ?',
    //计算购物车商品数量(total用来获取求和的值)
    getTotalCount: 'SELECT SUM(item_count) total FROM shop_car',
    //删除商品
    deleteItem: 'DELETE FROM shop_car WHERE car_id = ?',
    //减少数量
    cutCount: 'UPDATE shop_car SET item_count = item_count - 1 WHERE car_id = ?',
    //增加数量
    addCount: 'UPDATE shop_car SET item_count = item_count + 1 WHERE car_id = ?',
    //修改item_check
    updateItemCheck: 'UPDATE shop_car SET item_check = ? WHERE car_id = ?',
    //计算总价格
    calcTotalPrice: 'SELECT SUM(item_count * item_price) price FROM shop_car WHERE item_check = 1',
  },
  classify: {
    findAllClass: 'SELECT class_id, class_name FROM classes',
    findByclass: 'SELECT a.class_name, b.commodity_id, b.comm_price, b.comm_type, b.comm_describe, b.class_id FROM classes a LEFT JOIN commodity b ON a.class_id = b.class_id WHERE a.class_id = ?',
  }
};

module.exports = sqlMap;