// 引入mockjs
const Mock = require("mockjs");
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNotifysData = function() {
  let users = [];
  for (let i = 0; i < 10; i++) {
    let newUsersObject = {
      id: Random.integer(2, 10), // 随机生成由2-10的整数
      name: Random.cname(),
      email: Random.email(),
      notifyPic: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      notifyType: Random.integer(1, 3), //随机生成1-3的Integer
      isTop: Random.integer(1, 2), //随机生成1-2的Integer
      createUser: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      createTime: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    users.push(newUsersObject);
  }

  return {
    users: users
  };
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock("/admin/user", "post", produceNotifysData);
