<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="logo"><img alt="element-logo" src="" /><span></span></div>
      <el-menu
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        :default-active="this.$route.path"
      >
        <!-- 一级菜单 -->
        <el-submenu
          :index="item.id + ''"
          v-for="item in menuList"
          :key="item.id"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.authName }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            :index="'/' + subItem.path"
            v-for="subItem in item.children"
            :key="subItem.id"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{ subItem.authName }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div
          class="slide-toggle-open"
          style="width: 60px; cursor: pointer;"
          @click.prevent="toggleSideBar"
        >
          <transition name="hamburger">
            <span class="fa fa-bars fa-lg "></span>
          </transition>
        </div>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="el-dropdown">
          <el-dropdown>
            <span class="el-dropdown-link">
              管理员<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人资料</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item divided
                ><span @click="loginOut">退出登录</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <div>
        <el-col :span="24"
          ><div class="grid-content row-bg">eeeeeee</div></el-col
        >
      </div>
      <el-main>
        <!-- 路由占位符 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import mock from "@/mock/index";
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      // iconsObj: {
      //   '101':
      //   '102':
      //   "103":
      //   "104"
      // }
      // 是否折叠
      isCollapse: false
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      let menuList = [];
      this.$api
        .getMenu(JSON.stringify(menuList))
        .then(res => {
          // if (res.meta.status !== 200)
          //   return this.$message.error(res.meta.status);
          this.menuList = res;
          console.log(res);
        })
        .catch(function(res) {
          alert(res);
        });
    },
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    // logout() {
    //   sessionStorage.clear();
    //   this.$router.push("/login");
    // }
    loginOut() {
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.clear();
          console.log("退出成功");
          console.log(this);
          this.$router.push("./login");
          // this.$store.dispatch("loginOut").then(() => {
          //   location.reload(); // 为了重新实例化vue-router对象 避免bug
          // });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "操作失败"
          });
        });
    }
  }
};
</script>
<style>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  height: 50px !important;
  line-height: 50px;
  border-bottom: 1px solid #d8dce5;
}
.slide-toggle-open,
.breadcrumb {
  display: inline-block;
  float: left;
}
.el-dropdown {
  float: right;
}
.el-breadcrumb {
  height: 50px;
  line-height: 50px !important;
}
.logo {
  display: block;
  width: 100%;
  line-height: 80px;
  text-align: center;
  color: #fff;
  -webkit-transition: display 0.7s ease-in-out;
  transition: display 0.7s ease-in-out;
}
.logo img {
  vertical-align: middle;
}
.el-aside {
  background-color: #304156;
  /* height: 100%; */
}
.el-menu {
  border-right: none !important;
}

.el-main {
  /* background-color: #eaedf1; */
}

.grid-content {
  height: 36px;
  min-height: 36px;
}
.row-bg {
  padding: 0 20px;
  background-color: #f8f8f8;
}
</style>
