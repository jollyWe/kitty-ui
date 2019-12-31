import Mock from "mockjs";

import tableAPI from "./modules/user";

// 用户相关
Mock.mock(/\/user\/getUser/, "post", tableAPI.getUserList);
Mock.mock(/\/user\/remove/, "get", tableAPI.deleteUser);
Mock.mock(/\/user\/batchremove/, "get", tableAPI.batchremove);
Mock.mock(/\/user\/add/, "get", tableAPI.createUser);
Mock.mock(/\/user\/edit/, "get", tableAPI.updateUser);
