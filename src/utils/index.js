import Mock from "mockjs";

import tableAPI from "./pageList";

// 用户相关
Mock.mock(/\/user\/getUser/, "get", tableAPI.getUserList);
Mock.mock(/\/user\/remove/, "get", tableAPI.deleteUser);
Mock.mock(/\/user\/batchremove/, "get", tableAPI.batchremove);
Mock.mock(/\/user\/add/, "get", tableAPI.createUser);
Mock.mock(/\/user\/edit/, "get", tableAPI.updateUser);
