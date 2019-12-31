<template>
  <div>222</div>
</template>

<script>
require("./index2.js"); // 注意mock.js路径

export default {
  data() {
    return {
      tableData: [],
      limit: 5,
      page: 3,
      listParams: {
        pageIndex: 1,
        pageSize: 10
      }
    };
  },

  mounted() {
    //获取公告列表
    this.getPageList();
  },
  methods: {
    getPageList() {
      this.$http
        .post("/api/list", { para: this.listParams })
        .then(res => {
          // console.log(res);
          if (res.data.code === "0") {
            this.tableData = res.data.raticles;

            this.initPager.total = res.data.total;
            console.log(this.tableData);
          }
          //打印返回数据
          // console.log(this.tableData);
        })
        .catch(err => {
          console.log(err);
        });
    }

    // getUserList: config => {
    //   const { name, page = 1, limit = 20 } = param2Obj(config.url);

    //   const mockList = List.filter(user => {
    //     if (name && user.name.indexOf(name) === -1) return false;
    //     return true;
    //   });

    //   const pageList = mockList.filter(
    //     (item, index) => index < limit * page && index >= limit * (page - 1)
    //   );

    //   return {
    //     code: 0,
    //     data: {
    //       total: mockList.length,
    //       users: pageList
    //     }
    //   };
    // }
  }
};
</script>
<style></style>
