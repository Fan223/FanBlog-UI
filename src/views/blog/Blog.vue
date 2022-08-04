<template>
  <div class="mainContainer">
    <div class="mainHeader">
      <h1>博客管理</h1>
      <router-link to="/blog/add">
        <el-button type="primary" size="medium"
                   style="margin-right: 20px; margin-bottom: -10px">新增
        </el-button>
      </router-link>

    </div>
    <div style="padding-left: 40px; padding-right: 40px">
      <el-table
          ref="blogList"
          :data="blogList"
          fit
          border
          :stripe="true"
          max-height=520
          :header-cell-style="{background: '#ddd'}"
          @selection-change="handleSelectionChange"
          row-key="blogId"
          :default-sort="{prop: 'orderNum', order: 'ascending'}">
        <el-table-column
            type="selection"
            width="55"
            align="center">
        </el-table-column>
        <el-table-column
            prop="menuName"
            label="分类"
            align="center">
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            align="center">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建时间"
            align="center">
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">
              编辑
            </el-button>
            <el-button
                size="mini"
                type="danger">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
import "@/assets/css/container.css";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Blog',
  data() {
    return {
      blogList: [],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getBlogList() {
      this.$axios.get('/fanBlog/blog/queryAllBlog').then(res => {
        this.blogList = res.data.data;
      });
    },
  },
  created() {
    this.getBlogList();
  },
}
</script>

<style scoped>
.el-table {
  margin-bottom: 50px;
}
</style>
