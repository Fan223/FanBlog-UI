<template>
  <el-dialog
      title="新增菜单"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
      class="addMenu-dialog">
    <el-form :model="addMenuForm" ref="addMenuForm" label-width="80px" style="margin-top: -20px">
      <el-form-item label="上级菜单" prop="parentName">
        <el-select v-model="addMenuForm.parentName" clearable placeholder="请选择上级菜单">
          <el-option :value="addMenuForm.parentName" style="height: auto">
            <el-tree
                :data="menuList"
                :props="defaultProps"
                node-key="menuId"
                check-strictly
                :default-expand-all="true"
                @node-click="handleNodeClick">
            </el-tree>
          </el-option>
        </el-select>
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
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      addMenuForm: {
        parentId: "",
        parentName: "",
        menuName: "",
        path: "",
        permission: "",
        component: "",
        type: 1,
        icon: "",
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
    handleNodeClick(data) {
      this.addMenuForm.parentId = data.menuId;
      this.addMenuForm.parentName = data.menuName;
    },
    resetForm() {
      this.$refs['addMenuForm'].resetFields();
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.$bus.$on('addBlog', () => {
      this.dialogVisible = true;
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
