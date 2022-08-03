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
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="addMenuForm.menuName" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" prop="path">
        <el-input v-model="addMenuForm.path" placeholder="请输入菜单路径"></el-input>
      </el-form-item>
      <el-form-item label="权限编码" prop="permission">
        <el-input v-model="addMenuForm.permission" placeholder="请输入权限编码"></el-input>
      </el-form-item>
      <el-form-item label="组件名称" prop="component">
        <el-input v-model="addMenuForm.component" placeholder="请输入组件名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="addMenuForm.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-input v-model="addMenuForm.icon" placeholder="请输入菜单图标"></el-input>
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
  name: 'MenuAdd',
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
          this.$message.success("添加成功");
          this.$bus.$emit("refreshMenuList");
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
  created() {
    this.$bus.$on('addMenu', menuList => {
      this.dialogVisible = true;
      this.menuList = menuList;
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
