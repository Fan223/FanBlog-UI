<template>
  <div class="mainContainer">
    <div class="mainHeader">
      <h1>菜单管理</h1>
      <el-button @click="$bus.$emit('addMenu', menuList)">新增菜单</el-button>
      <MenuAdd />
    </div>
    <el-table
        ref="menuTree"
        :data="menuList"
        fit
        :stripe="true"
        max-height=520
        :header-cell-style="{background: '#545c64', color: '#fff'}"
        @selection-change="handleSelectionChange"
        row-key="menuId"
        :tree-props="{ hasChildren: 'hasChildren', children: 'children' }">
      <el-table-column
          type="selection"
          width="55"
          align="center">
      </el-table-column>
      <el-table-column
          prop="menuName"
          label="菜单名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="path"
          label="菜单路径"
          width="120"
          align="center">
      </el-table-column>
      <el-table-column
          prop="permission"
          label="权限编码"
          width="120"
          align="center">
      </el-table-column>
      <el-table-column
          prop="component"
          label="组件名称"
          width="120"
          align="center">
      </el-table-column>
      <el-table-column
          prop="type"
          label="菜单类型"
          width="120"
          align="center">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="菜单图标"
          width="120"
          align="center">
      </el-table-column>
      <el-table-column
          prop="orderNum"
          label="排序"
          width="120"
          align="center">
      </el-table-column>
      <el-table-column
          prop="valiFlag"
          label="状态"
          width="120"
          align="center">
      </el-table-column>
      <!--    <el-table-column-->
      <!--        prop="createTime"-->
      <!--        label="创建时间"-->
      <!--        width="120"-->
      <!--        align="center">-->
      <!--    </el-table-column>-->
    </el-table>
  </div>

</template>

<script>
import MenuAdd from "@/views/menu/MenuAdd";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Menu',
  data() {
    return {
      menuList: [],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    getMenuTree() {
      this.$axios.get('/fanBlog/menu/queryAllMenu').then(res => {
        this.menuList = res.data.data;
      });
    },
    addMenu() {
      this.$router.push({
        path: '/menu/addMenu'
      });
    }
  },
  created() {
    this.getMenuTree();
  },
  components: {
    MenuAdd
  }
}
</script>

<style scoped>
.mainContainer {
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 5px grey;
  padding-left: 25px;
  padding-right: 25px;
}
.mainHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
