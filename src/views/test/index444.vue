<template>
  <div>222</div>
</template>

<script>
require("./index2.js"); // 注意mock.js路径

export default {
  data() {
    return {
      limit: 5,
      page: 3,
      listParams: {
        pageIndex: 0,
        pageSize: 10,
        limit: 5,
        page: 3
      }
    };
  },

  mounted() {
    //获取公告列表
    this.getAdminNotifyList();
  },
  methods: {
    getAdminNotifyList() {
      this.$http
        .post("/admin/user")
        .then(resp => {
          this.notifyList = resp.data.users;
          //打印返回数据
          console.log(this.notifyList);
          this.notifyList = this.notifyList.filter(user => {
            if (name && user.name.indexOf(name) === -1) return false;
            return true;
          });
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
