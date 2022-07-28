<template>
  <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%">
    <el-form ref="addMenuForm" :model="addMenuForm" label-width="80px">
      <el-form-item label="上级菜单">
        <el-select v-model="addMenuForm.parentId" placeholder="请选择上级菜单">
          <el-option :value="addMenuForm.parentId" style="height: auto">
            <el-tree
                :data="menuList"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                :default-expand-all="true"
                @node-click="handleNodeClick">
            </el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input v-model="addMenuForm.menuName" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径">
        <el-input v-model="addMenuForm.path" placeholder="请输入菜单路径"></el-input>
      </el-form-item>
      <el-form-item label="权限编码">
        <el-input v-model="addMenuForm.permission" placeholder="请输入权限编码"></el-input>
      </el-form-item>
      <el-form-item label="组件名称">
        <el-input v-model="addMenuForm.component" placeholder="请输入组件名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-input v-model="addMenuForm.type" placeholder="请输入菜单类型"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="addMenuForm.icon" placeholder="请输入菜单图标"></el-input>
      </el-form-item>
      <el-form-item label="排序号">
        <el-input-number
            v-model="addMenuForm.orderNum"
            :min="1"
            label="排序号"
        >1
        </el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMenu()">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
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
        menuName: "",
        path: "",
        permission: "",
        component: "",
        type: "",
        icon: "",
        orderNum: "",
      },
    }
  },
  methods: {
    addMenu() {

    },
    handleNodeClick(data) {
      this.addMenuForm.parentId = data.id;
    },
  },
  created() {
    this.$bus.$on('addMenu', menuList => {
      this.dialogVisible = true;
      this.menuList = menuList;
      console.log(this.menuList);
    });
  }
}
</script>
