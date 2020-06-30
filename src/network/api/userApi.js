const db = require('../db');
const sqlMap = require('../sqlMap');
const express = require('express');
const { response } = require('express');
const router = express.Router();
//获取登录用户
router.get('/mine', function (request, response) {
  db.query(sqlMap.user.select, function (error, result) {
    if (error) {
      console.log(error);
    }
    response.json(result);
  });
});
//登录时检测用户是否存在
router.get('/toLogin', function (request, response) {
  // console.log(request.query);
  let username = request.query.username;
  let password = request.query.password;
  let login = 'SELECT * FROM users WHERE username = "' + username + '" and password = "' + password + '"';
  db.query(login, function (error, result) {
    if (error) {
      return response.json(error);
    }
    if (result.length === 0) {
      response.json({
        message: '用户不存在',
        res_code: 0
      })
    } else {
      response.json({
        result,
        res_code: 1
      });
    }
  });
});
//注册
router.post('/register', function (request, response) {
  let username = request.body.user.username;
  let password = request.body.user.password;
  let nickname = request.body.user.nickname;
  let qq = request.body.user.qq;
  let phoneNum = request.body.user.phoneNum;
  let email = request.body.user.email;
  db.query(sqlMap.user.register, [username, password, nickname, qq, phoneNum, email], function (error, data) {
    if (error) response.json(error);
    response.json(data);
  })
});
//获取新闻列表
router.get('/newsList', function (request, response) {
  db.query(sqlMap.news.newsList, function (error, result) {
    if (error) {
      console.log(error);
    }
    response.json(result);
  });
});
//发博客（新闻）
router.post('/sendNews', function (request, response) {
  console.log(request.body);
  let id;
  let title = request.body.title;
  let content = request.body.content;
  let time = new Date();
  db.query(sqlMap.news.getMaxId, function (error, data) {
    if (error) {
      return error;
    }
    //获取news表中最大的id 进行 + 1(因为id没有设置自增，且是外键)
    id = data[0].max_id + 1;
    console.log(id);
    db.query(sqlMap.news.sendNews, [id, title, content, time, 0], function (error, data) {
      if (error) response.json(error);
      // console.log(data);
      response.json(data);
    });
  });
});
//获取对应新闻信息
router.get('/newsInfo', function (request, response) {
  let id = request.query.id;
  db.query(sqlMap.news.newsAndComments, id, function (error, data) {
    if (error) {
      console.log(error);
    }
    response.json(data);
  });
  //刷新浏览次数
  db.query(sqlMap.news.updateSeeTimes, id, function (error, result) {
    if (error) {
      console.log(error);
    }
  })
});
//发表评论
router.post('/postComment', function (request, response) {
  //注意SQL使用 SET 插入数据，对应的字段名称必须跟数据库字段名称相同
  let id = request.body.id;
  let nickname = request.body.nickname;
  let comment_body = request.body.commentBody;
  let comment_time = new Date();
  let post = {
    id,
    nickname,
    comment_body,
    comment_time
  };
  let sql = 'INSERT INTO comments SET ?';
  db.query(sql, post, function (error, data) {
    if (error) {
      return response.json(error);
    }
    // console.log(data);
    response.json(data);
  });
});
//加载商城
router.get('/loadGoods', function (request, response) {
  db.query(sqlMap.mall.loadGoods, function (error, data) {
    if (error) {
      return error;
    }
    // console.log(data);
    response.json(data);
  });
});
//加载商城中对应商品信息
router.get('/loadGoodsInfo', function (request, response) {
  let id = request.query.id;
  db.query(sqlMap.mall.loadGoodsInfo, id, function (error, data) {
    if (error) {
      return error;
    }
    // console.log(data);
    response.json(data);
  });
});
//获取商品样式
router.get('/getSize', function (request, response) {
  db.query(sqlMap.mall.getStyle, function (error, data) {
    if (error) {
      response.json(error);
    }
    // console.log(data);
    response.json(data);
  });
});
//获取购物车数据
router.get('/loadItem', function (request, response) {
  db.query(sqlMap.car.getCarItem, function (error, data) {
    if (error) {
      response.json(error);
    }
    // console.log(data);
    // response.json(data);
    db.query(sqlMap.car.calcTotalPrice, function(error, result) {
      if (error) response.json(error);
      // console.log(result[0].price);
      response.json([data, result]);
    });
  });
});
//加入购物车
router.post('/addGoodsItem', function (request, response) {
  // console.log(request.body.order.goodsInfo);
  //获取请求参数; 定义成item_xx 与数据库字段名称相同是为了，使用Object.is()方法进行对象判断是否相同。
  let item_id = request.body.order.id;
  let item_color = request.body.order.styleHadSelect.color;
  let item_size = request.body.order.styleHadSelect.size;
  let item_price = request.body.order.goodsInfo.goods_price;
  let item_describe = request.body.order.goodsInfo.goods_describe;
  let item = {item_price, item_describe, item_color, item_size};
  let item_count = 1;
  //获取购物车中所有商品用于判断是否存在 item_id 的商品
  db.query(sqlMap.car.ifItemHadExist, item_id, function (error, data) {
    if (error) {
      return error;
    }
    //Object.is()判断两个对象是否相等，直接判断容易失败，转为字符串进行判断。
    //判断加入购物车的商品是否存在购物车列表(商品的所有信息都要相等除了数量)
    let flag = false;  //定义一个flag用于记录购物车中是否有完全相同的商品
    let goodsItem = '';
    if (data.length) {
      for (let i in data) {
        if (Object.is(JSON.stringify(data[i]), JSON.stringify(item))) {
          flag = true;  //有相同
          goodsItem = data[i];   //获取相同商品
          break;  //只要有完全相同的商品就退出循环。
        } else {
          flag = false;  //没有相同
        }
      }
      //存在商品不同样式,加入购物车
      if (!flag) {
        db.query(sqlMap.car.addCarItem, [item_price, item_describe, item_size, item_color, item_count, item_id], function (error, data) {
          if (error) {
            response.json(error);
          }
          response.json(data);
        });
      } else {
        //相同商品存在购物车，将其数量+1
        db.query(sqlMap.car.updateItemCount, [goodsItem.item_describe, goodsItem.item_color, goodsItem.item_size], function (error, data) {
          if (error) {
            response.json(error);
          }
          response.json(data);
        });
      }
    } else {
      //不存在同款且不存在购物车，加入购物车
      db.query(sqlMap.car.addCarItem, [item_price, item_describe, item_size, item_color, item_count, item_id], function (error, data) {
        if (error) {
          response.json(error);
        }
        response.json(data);
      });
    }
  });

});
//删除购物车物品
router.delete('/deleteItemById', function (request, response) {
  let id = request.body.id; //获取商品的car_id
  db.query(sqlMap.car.deleteItem, id, function (error, data) {
    if (error) {
      response.json(error);
    }
    response.json(data);
  });
});
//减少商品数量
router.get('/subCount', function (request, response) {
  // console.log(request.query);
  let id = request.query.id;
  db.query(sqlMap.car.cutCount, id, function (error, data) {
    if (error) {
      response.json(error);
    }
    response.json(data);
  });
});
//增加数量
router.get('/addCount', function (request, response) {
  // console.log(request.query);
  let id = request.query.id;
  db.query(sqlMap.car.addCount, id, function (error, data) {
    if (error) {
      response.json(error);
    }
    response.json(data);
  });
});
//修改item_check
router.post('/getPrice', function(request, response) {
  // console.log(request.body);
  let itemCheck = request.body.check;
  let id = request.body.carId;
  let sql = "UPDATE shop_car SET item_check = '"+ itemCheck +"' WHERE car_id = ?";
  db.query(sql, [id], function(error, data) {
    if (error) response.json(error);
    response.json(data);
  });
 
});
//加载分类
router.get('/getClasses', function (request, response) {
  db.query(sqlMap.classify.findAllClass, function (error, data) {
    if (error) response.json(error);
    // console.log(data);
    response.json(data);
  });
});
//加载每一类对应
router.get('/getCommodity', function (request, response) {
  console.log(request.query.id);
  let id = request.query.id
  db.query(sqlMap.classify.findByclass, id, function (error, data) {
    if (error) response.json(error);
    // console.log(data);
    
    response.json(data);
  });
});

module.exports = router;