//mock.js 文件

import Mock from "mockjs"; // 引入mockjs
const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据
const dataList = []; // 用于接受生成数据的数组
for (let i = 0; i < 26; i++) {
  // 可自定义生成的个数
  const template = {
    Boolean: Random.boolean, // 可以生成基本数据类型
    Natural: Random.natural(1, 10), // 生成1到100之间自然数
    Integer: Random.integer(1, 100), // 生成1到100之间的整数
    Float: Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
    Character: Random.character(), // 生成随机字符串,可加参数定义规则
    String: Random.string(2, 10), // 生成2到10个字符之间的字符串
    Range: Random.range(0, 10, 2), // 生成一个随机数组
    Date: Random.date(), // 生成一个随机日期,可加参数定义日期格式
    Image: Random.image(Random.size, "#02adea", "Hello"), // Random.size表示将从size数据中任选一个数据
    Color: Random.color(), // 生成一个颜色随机值
    Paragraph: Random.paragraph(2, 5), // 生成2至5个句子的文本
    Name: Random.name(), // 生成姓名
    Url: Random.url(), // 生成web地址
    Address: Random.province() // 生成地址
  };

  dataList.push(template);
}

// list 分页接口()

Mock.mock("/api/list", "post", params => {
  var info = JSON.parse(params.body);
  var [index, size, total] = [info.pageIndex, info.pageSize, dataList.length];
  var len = total / size;
  var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len;
  var newDataList = dataList.slice(index * size, (index + 1) * size);
  let articles = [];
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }
  return {
    code: "0",
    message: "success",
    data: {
      pageIndex: index,
      pageSize: size,
      rows: newDataList,
      total: total,
      totalPages: totalPages,
      articles: articles
    }
  };
});
