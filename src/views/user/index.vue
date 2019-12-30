<template>
  <el-form ref="form" :model="sizeForm" size="small" inline>
    <el-form-item>
      <el-input v-model="sizeForm.name" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="sizeForm.name" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="sizeForm.name" placeholder="用户名"></el-input>
    </el-form-item>
    <el-button-group>
      <el-button type="primary" icon="el-icon-refresh" size="small"></el-button>
      <el-button type="primary" icon="el-icon-search" size="small"
        >查询</el-button
      >
      <el-button type="primary" icon="el-icon-plus" size="small"
        >增加</el-button
      >
    </el-button-group>
    <!-- 用户列表区域 -->
    <el-table :data="userList" style="width: 100%" stripe>
      <el-table-column type="index" label="ID"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width=""> </el-table-column>
      <el-table-column prop="mobile" label="电话" width=""> </el-table-column>
      <el-table-column prop="role" label="角色" width=""> </el-table-column>
      <el-table-column label="状态" width="">
        <template v-slot="scope"
          ><el-switch v-model="scope.row.mg_state"> </el-switch
        ></template>
      </el-table-column>
      <el-table-column prop="create_time" label="登录时间" width="">
      </el-table-column>
      <el-table-column prop="" label="操作" width="180">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
          <el-tooltip
            class="item"
            effect="dark"
            content="分配角色"
            placement="top"
          >
            <el-button
              type="warning"
              icon="el-icon-user-solid"
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1, 2, 3, 5]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-form>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import mock from "@/mock/index";
export default {
  data() {
    return {
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      listParams: {
        pageIndex: 0,
        pageSize: 10
      },
      total: 0,
      userList: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      let userList = [];
      this.$api
        .getUser(JSON.stringify(userList))
        .then(res => {
          if (res.meta.status !== 200)
            return this.$message.error("获取用户列表失败！");
          this.userList = res.users;
          this.total = res.totalpage;
          console.log(res.totalpage);
        })
        .catch(function(res) {
          alert(res);
        });
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style>
.el-table {
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
