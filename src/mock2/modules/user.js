import Mock from "mockjs";

function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

let List = [];
const count = 20;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.integer(2, 10), // 随机生成由2-10的整数
      name: Mock.Random.cname(),
      email: Mock.Random.email(),
      phone: /^1[385][1-9]\d{8}/,
      "role|1": ["教授", "律师", "医生", "公务员", "大学老师", "警察", "白领"],
      "mg_state|1-2": true, //布尔值，可真可假
      loginTime: Mock.Random.date() + " " + Mock.Random.time()
    })
  );
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
    // const { name, page = 1, limit = 5 } = param2Obj(config.body);
    // console.log("ok");
    const info = JSON.parse(config.body);
    // console.log(info.page);
    // console.log(info);
    let page = info.page;
    let limit = info.limit;
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1) return false;
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 20000,
      count: mockList.length,
      data: pageList
    };
  },
  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: config => {
    const { name, addr, age, birth, sex } = param2Obj(config.url);
    List.push({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    });
    return {
      code: 20000,
      data: {
        message: "添加成功"
      }
    };
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    const { id } = param2Obj(config.url);
    if (!id) {
      return {
        code: -999,
        message: "参数不正确"
      };
    } else {
      List = List.filter(u => u.id !== id);
      return {
        code: 20000,
        data: {
          message: "删除成功"
        }
      };
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url);
    ids = ids.split(",");
    List = List.filter(u => !ids.includes(u.id));
    return {
      code: 20000,
      data: {
        message: "批量删除成功"
      }
    };
  },
  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const { id, name, addr, age, birth, sex } = param2Obj(config.url);
    const sex_num = parseInt(sex);
    List.some(u => {
      if (u.id === id) {
        u.name = name;
        u.addr = addr;
        u.age = age;
        u.birth = birth;
        u.sex = sex_num;
        return true;
      }
    });
    return {
      code: 20000,
      data: {
        message: "编辑成功"
      }
    };
  }
};
