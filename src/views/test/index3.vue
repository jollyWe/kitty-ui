<template>
  <div>
    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      highlight-current-row
      style="width: 100%;margin-bottom: 20px;"
      height="800px"
      v-loading="listLoading"
      size="medium"
      class="planListTable el-table__column-filter-trigger"
    >
    </el-table>

    <!-- 分页 -->
    <el-col :span="24" class="">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getPlanListPage } from "@/api/api";
import { mapGetters } from "vuex";
export default {
  components: {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line vue/no-unused-components
    // ListForm
  },
  data() {
    return {
      listLoading: false, // 加载效果
      total: 0, // 数据总数
      currentPage: 1, // 当前页
      pageSize: 20, // 每页数据数量
      tableData: [], // 数据
      multipleSelection: []
    };
  },
  mounted() {
    this.getPlanList();
  },
  computed: {
    ...mapGetters("planList", ["list"])
  },
  methods: {
    getPlanList() {
      let para = {
        page: this.currentPage,
        pageSize: this.pageSize
      };
      this.listLoading = true;
      this.$http
        .get("/flight/getListPage", { para: para })
        .then(res => {
          console.log(res.data);
          this.total = res.data.total;
          this.tableData = res.data.list;
          this.listLoading = false;
        })
        .catch(error => {
          console.log(error);
          console.log();
        });
    },
    // 显示每页多少条数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getPlanList();
    },
    // 显示当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPlanList();
    }
  }
};
</script>

<style></style>
