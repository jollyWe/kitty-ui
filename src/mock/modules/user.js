import Mock from "mockjs"; // 引入mockjs
const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据
// 获取用户信息
export function getUser() {
  return {
    // isOpen: false,
    url: "http://localhost:8080/user",
    type: "post",
    data: {
      totalpage: 5,
      pagenum: 4,
      users: [
        {
          id: 1,
          username: Random.name(), // 生成姓名
          email: "@email", // 随机生成姓名
          mobile: "17722519116",
          type: 1,
          create_time: Random.date(),
          mg_state: true,
          role: "超级管理员"
        },
        {
          id: 2,
          username: "@name", // 随机生成姓名
          email: "@email", // 随机生成姓名
          mobile: "17722519116",
          type: 1,
          create_time: "2019-12-30",
          mg_state: false,
          role: "管理员"
        },
        {
          id: 3,
          username: "@name", // 随机生成姓名
          email: "@email", // 随机生成姓名
          mobile: "17722519116",
          type: 1,
          create_time: "2019-12-30",
          mg_state: false,
          role: "炒鸡管理员"
        }
      ],
      meta: {
        msg: "success",
        status: 200
      }
    }
  };
}
