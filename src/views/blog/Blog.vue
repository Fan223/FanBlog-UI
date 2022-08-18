<template>
  <div>
    <div class="mainContainer">
      <el-form
          :inline="true"
          size="medium"
          :model="searchForm"
          ref="searchForm"
          @keyup.enter.native="getBlogList"
      >
        <el-form-item
            label="标题"
            prop="title"
        >
          <el-input
              v-model="searchForm.title"
              placeholder="请输入标题"
              clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="searchForm.category" clearable placeholder="请选择" style="line-height: 60px">
            <el-option
                v-for="item in categoryList"
                :key="item.menuId"
                :label="item.menuName"
                :value="item.menuId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="line-height: 60px; margin-left: 20px">
            <el-button
                size="small"
                type="primary"
                icon="el-icon-search"
                @click="getBlogList"
            >查询
            </el-button>
            <el-button
                @click="() => this.$refs['searchForm'].resetFields()"
                icon="el-icon-refresh-right"
            >重置
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="mainContainer">
      <div class="mainHeader">
        <h1>博客管理</h1>
        <div style="margin-right: 20px; margin-bottom: -10px">
          <router-link to="/blog/add">
            <el-button type="primary" size="small" style="margin-right: 10px">新增
            </el-button>
          </router-link>
          <el-button type="danger" size="small" @click="deleteBlog">
            删除选中
          </el-button>
        </div>
      </div>
      <div style="padding-left: 40px; padding-right: 40px">
        <el-table
            ref="blogList"
            :data="blogList"
            fit
            border
            :stripe="true"
            max-height=420
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
              prop="title"
              label="标题"
              align="center">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
              width="200">
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editBlog(scope.row)">
                编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="deleteBlog(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
            class="mainPagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.current"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pagination.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>
      </div>
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
      searchForm: {
        title: '',
        category: '',
      },
      categoryList: [],
      blogList: [],
      multipleSelection: [],
      pagination: {}
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getBlogList();
    },
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getBlogList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getBlogList() {
      this.$axios.get('/fanBlog/blog/queryBlog', {
        params: {
          title: this.searchForm.title,
          category: this.searchForm.category,
          current: this.pagination.current,
          size: this.pagination.size
        }
      }).then(res => {
        this.blogList = res.data.data.records;
        this.pagination.total = res.data.data.total;
        this.pagination.size = res.data.data.size;
        this.pagination.current = res.data.data.current;
        this.pagination.pages = res.data.data.pages;
      });
    },
    deleteBlog(row) {
      this.$confirm('确认删除该文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let idList = [];
        if (row.blogId) {
          idList.push(row.blogId)
        } else {
          idList = this.multipleSelection.map(value => value.blogId);
        }

        this.$axios.delete('/fanBlog/blog/deleteBlog', {data: idList}).then(res => {
          if (res.data.code == 200) {
            this.$message.success('删除成功');
            this.getBlogList();
            this.getMenuList();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    getMenuList() {
      this.$axios.get('/fanBlog/menu/queryAllMenu').then(res => {
        this.$store.state.menuList = res.data.data;
      });
    },
    editBlog(row) {
      this.$router.push({
        name: 'AddBlog',
        params: {
          flag: 'edit',
          blogId: row.blogId,
          title: row.title,
          content: row.content
        }
      })
    },
    getCategory() {
      this.$axios.get('/fanBlog/menu/getCategory').then(res => {
        this.categoryList = res.data.data;
      });
    }
  },
  created() {
    this.getBlogList();
    this.getCategory();
  },
}
</script>

<style scoped>
.el-pagination {
  margin-top: 10px;
  margin-bottom: 20px;
}
.el-form {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  min-width: 740px;
}
::v-deep .el-form-item__label {
  font-weight: bold;
}
.el-input {
  line-height: 60px;
}
</style>
