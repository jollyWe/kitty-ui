// 引入mockjs
const Mock = require("mockjs");
// const _PATH_CONTEXT = "/service-admin";
const Random = Mock.Random;
const _PATH_RESOURCE = "http://localhost:8080";
// mock一组数据
// Mock.mock( url, post/get , 返回的数据)

// listCategory
Mock.mock(_PATH_RESOURCE + "/api/v1/categories", "get", function() {
  let categories = [];
  for (let i = 0; i < 5; i++) {
    let newArticleObject = {
      id: Random.guid(),
      name: Random.cword(4, 6),
      sort: Random.integer(1, 99),
      createdBy: Random.word(6),
      createdDate: Random.datetime()
    };
    categories.push(newArticleObject);
  }
  return categories;
});

// listTag
// eslint-disable-next-line no-unused-vars
Mock.mock(_PATH_RESOURCE + "/api/v1/tags", "post", function(data) {
  let tags = [];
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      name: Random.cword(4, 6),
      icon: Random.dataImage("50x50", "tag"),
      sort: Random.integer(1, 99),
      category: Random.integer(1, 10)
    };
    tags.push(newArticleObject);
  }
  return tags;
});
