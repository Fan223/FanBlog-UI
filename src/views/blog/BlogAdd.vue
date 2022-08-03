<template>
  <el-dialog
      title="新增菜单"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
      class="addMenu-dialog">
    <el-form :model="addMenuForm" ref="addBlogForm" label-width="80px" style="margin-top: -20px">
      <el-form-item label="选择分类" prop="menuId">
        <el-checkbox-group
            v-model="checkedMenu"
            :max="1">
          <el-checkbox v-for="menu in menuList" :label="menu.menuId" :key="menu.menuId">{{ menu.menuName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input-number
            v-model="addMenuForm.orderNum"
            :min="1">
        </el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="addMenu">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'BlogAdd',
  data() {
    return {
      dialogVisible: false,
      menuList: [],
      checkedMenu: [],
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      addMenuForm: {
        parentId: "",
        orderNum: 1,
      },
    }
  },
  methods: {
    addMenu() {
      this.$axios.post("/fanBlog/menu/addMenu", this.addMenuForm).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.$bus.$emit("refreshMenuList");
          this.dialogVisible = false;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    addBlog() {
      this.$axios.post('/fanBlog/blog/addBlog', this.editForm).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: '发布成功',
            type: 'success'
          });
          this.$router.go(-1);
        } else {
          this.$message({
            message: '发布失败',
            type: 'error'
          });
        }
      })
    },
    resetForm() {
      this.$refs['addMenuForm'].resetFields();
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.$bus.$on('addBlog', () => {
      this.dialogVisible = true;
      this.menuList = this.$store.state.menuList;
    });
  }
}
</script>

<style scoped>
.addMenu-dialog {
  margin-top: -5%;
}

.el-form {
  width: 80%;
  margin: 0 auto;
}

.el-form-item {
  margin: 20px auto;
}
</style>
