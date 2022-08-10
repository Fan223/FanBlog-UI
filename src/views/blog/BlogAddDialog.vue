<template>
  <el-dialog
      title="发布文章"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      class="addMenu-dialog">
    <el-form :model="addBlogForm" ref="addBlogForm">
      <span>选择分类：</span>
      <el-checkbox-group
          v-model="addBlogForm.parentId"
          :max="1">
        <el-checkbox border v-for="menu in menuList" :label="menu.menuId"
                     :key="menu.menuId">
          {{ menu.menuName }}
        </el-checkbox>
      </el-checkbox-group>
      <el-form-item label="排序号：" prop="orderNum">
        <el-input-number
            v-model="addBlogForm.orderNum"
            :min="1">
        </el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="addBlog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'BlogAddDialog',
  data() {
    return {
      dialogVisible: false,
      checkedMenu: [],
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      addBlogForm: {
        blogId: '',
        menuId: '',
        parentId: [],
        orderNum: 1,
        title: '',
        content: '',
      },
    }
  },
  methods: {
    addBlog() {
      this.addBlogForm.parentId = this.addBlogForm.parentId[0];
      this.$axios.post('/fanBlog/blog/addBlog', this.addBlogForm).then(res => {
        if (res.data.code == 200) {
          this.$message.success("发布成功")
          this.$store.state.hasRoute = false;
          this.$router.go(-1);
        } else {
          this.$message.success(res.data.msg)
        }
      })
    },
    resetForm() {
      this.$refs['addBlogForm'].resetFields();
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.$bus.$on('addBlogDialog', (blog) => {
      this.dialogVisible = true;
      this.menuList = this.$store.state.menuList;
      this.addBlogForm.blogId = blog.blogId;
      this.addBlogForm.menuId = blog.menuId;
      this.addBlogForm.title = blog.title;
      this.addBlogForm.content = blog.content;
    });
  }
}
</script>

<style scoped>
.addMenu-dialog {
  margin-top: -5%;
}
.el-form {
  width: 70%;
  margin: -20px auto;
}
.el-checkbox-group {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 5px grey;
  width: 80%; margin: 20px auto;
  padding: 20px;
}
</style>
