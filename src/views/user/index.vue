<template>
  <div>
    <el-form ref="form" :model="sizeForm" size="small" inline>
      <el-form-item>
        <el-input v-model="userList.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="sizeForm.name" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="sizeForm.name" placeholder="状态"></el-input>
      </el-form-item>
      <el-button-group>
        <el-button
          type="primary"
          icon="el-icon-refresh"
          size="small"
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="getUser()"
          >查询</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="aadDalogVisible = true"
          >增加</el-button
        >
      </el-button-group>
      <!-- 用户列表区域 -->
      <el-table :data="userList" style="width: 100%" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width=""> </el-table-column>
        <el-table-column prop="phone" label="电话" width=""> </el-table-column>
        <el-table-column prop="role" label="角色" width=""> </el-table-column>
        <el-table-column label="状态" width="">
          <template v-slot="scope"
            ><el-switch
              v-model="scope.row.mg_state"
              @change="userChangeState(scope.row)"
            >
            </el-switch
          ></template>
        </el-table-column>
        <el-table-column prop="loginTime" label="登录时间" width="">
        </el-table-column>
        <el-table-column prop="" label="操作" width="180">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
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
        :current-page="listQuery.page"
        :page-sizes="[3, 5, 8]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-form>

    <el-dialog title="添加用户" :visible.sync="aadDalogVisible" width="50%">
      <el-form
        :model="addUserForm"
        :rules="addUserRules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="username"  size="small">
          <el-input v-model="addUserForm.username" size="small"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="aadDalogVisible = false" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="aadDalogVisible = false" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import mock from "@/mock/index";
import axios from "axios";
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
      userList: [],
      listQuery: {
        page: 1,
        limit: 5
      },
      aadDalogVisible: false,
      // 添加用户的表单数据
      addUserForm: {
        username: ""
      },
      // 添加用户的表单数据验证规则
      addUserRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3-10个字符之间",
            trigger: "blur"
          }
        ]
      },
      // 添加用户的表单数据
      addUserruleForm: {
        username: ""
      },
      // 添加用户的表单数据验证规则
      addUserRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // this.getUserList();
    this.getUser();
  },
  methods: {
    getUserList() {
      let userList = [];
      this.$api
        .getUser(JSON.stringify(userList))
        .then(res => {
          if (res.meta.status !== 200)
            return this.$message.error("获取用户列表失败！");
          // this.userList = res.users;
          // this.total = res.totalpage;
          console.log(res.totalpage);
        })
        .catch(function(res) {
          alert(res);
        });
    },
    getUser() {
      // api就是你线上的网址
      axios
        .post("/api/user/getUser", this.listQuery)
        .then(res => {
          this.userList = res.data.data;
          this.total = res.data.count;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.listQuery.limit = newSize;
      this.getUser();
      console.log(newSize);
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.listQuery.page = newPage;
      this.getUser();
      console.log(newPage);
    },
    // 监听 switch 开关
    userChangeState(userInfo) {
      console.log(userInfo);
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
