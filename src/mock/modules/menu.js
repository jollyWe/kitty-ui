// 获取菜单信息
export function getMenu() {
  return {
    // isOpen: false,
    url: "http://localhost:8080/menu",
    type: "post",
    data: [
      {
        // msg: "success",
        // code: 0,
        // data: {
        //   id: "@increment",
        //   name: "menu", // 随机生成姓名
        //   "order|10-20": 12
        //   // 其他数据
        // }

        id: 101,
        authName: "商品管理",
        path: "shop",
        children: [
          {
            id: 104,
            authName: "商品列表",
            path: "shopList",
            children: []
          }
        ],
        meta: {
          msg: "获取菜单列表成功",
          status: 200
        }
      },
      {
        id: 102,
        authName: "用户管理",
        path: "",
        children: [
          {
            id: 103,
            authName: "用户列表",
            path: "users",
            children: []
          }
        ],
        meta: {
          msg: "获取菜单列表成功",
          status: 200
        }
      }
    ]
  };
}
