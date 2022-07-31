<template>
  <el-dialog
      title="修改菜单"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="resetForm"
      width="50%"
      class="editMenu-dialog">
    <el-form ref="editMenuForm" :model="editMenuForm" label-width="80px" style="margin-top: -20px">
      <el-form-item label="上级菜单" prop="parentName">
        <el-select v-model="editMenuForm.parentName" clearable placeholder="请选择上级菜单">
          <el-option :value="editMenuForm.parentName" style="height: auto">
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
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="editMenuForm.menuName" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" prop="path">
        <el-input v-model="editMenuForm.path" placeholder="请输入菜单路径"></el-input>
      </el-form-item>
      <el-form-item label="权限编码" prop="permission">
        <el-input v-model="editMenuForm.permission" placeholder="请输入权限编码"></el-input>
      </el-form-item>
      <el-form-item label="组件名称" prop="component">
        <el-input v-model="editMenuForm.component" placeholder="请输入组件名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="editMenuForm.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-input v-model="editMenuForm.icon" placeholder="请输入菜单图标"></el-input>
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input-number
            v-model="editMenuForm.orderNum"
            :min="1">
        </el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editMenu">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'MenuEdit',
  data() {
    return {
      dialogVisible: false,
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      editMenuForm: {},
    }
  },
  methods: {
    editMenu() {
      this.$axios.put("/fanBlog/menu/editMenu", this.editMenuForm).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$bus.$emit('refreshMenuList');
          this.dialogVisible = false;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    handleNodeClick(data) {
      this.editMenuForm.parentId = data.menuId;
      this.editMenuForm.parentName = data.menuName;
    },
    resetForm() {
      this.$refs['editMenuForm'].resetFields();
    },
  },
  created() {
    this.$bus.$on('editMenu', (row, menuList) => {
      this.dialogVisible = true;
      this.editMenuForm = JSON.parse(JSON.stringify(row));
      this.menuList = menuList;
    });
  }
}
</script>

<style scoped>
.editMenu-dialog {
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