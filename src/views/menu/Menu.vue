<template>
  <div class="mainContainer">
    <div class="mainHeader">
      <h1>菜单管理</h1>
      <el-button @click="$bus.$emit('addMenu', menuList)" type="primary" size="medium">新增</el-button>
      <MenuAdd/>
    </div>
    <el-table
        ref="menuList"
        :data="menuList"
        fit
        border
        :stripe="true"
        max-height=520
        :header-cell-style="{background: '#ddd'}"
        @selection-change="handleSelectionChange"
        row-key="menuId"
        :default-sort="{prop: 'orderNUm', order: 'ascending'}"
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
          width="130"
          align="center">
      </el-table-column>
      <el-table-column
          prop="orderNum"
          label="排序号"
          width="50"
          align="center">
      </el-table-column>
      <el-table-column
          prop="valiFlag"
          label="状态"
          width="70"
          align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1" size="small" effect="dark">
            目录
          </el-tag>
          <el-tag v-if="scope.row.type === 2" size="small" effect="dark" type="success">
            菜单
          </el-tag>
          <el-tag v-if="scope.row.type === 3" size="small" effect="dark" type="info">
            按钮
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间"
          align="center">
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button @click="$bus.$emit('editMenu', scope.row, menuList)" type="primary" size="mini">
            编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="deleteMenu(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <MenuEdit />
  </div>

</template>

<script>
import MenuAdd from "@/views/menu/MenuAdd";
import MenuEdit from "@/views/menu/MenuEdit";

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
      this.multipleSelection = val;
    },
    getMenuList() {
      this.$axios.get('/fanBlog/menu/queryAllMenu').then(res => {
        this.menuList = res.data.data;
      });
    },
    deleteMenu(row) {
      this.$confirm('确认删除该菜单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row);
        this.$axios.delete('/fanBlog/menu/deleteMenu', {data: row}).then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.getMenuList();
        });
      }).catch(() => {
        this.$message({
          message: '已取消删除',
          type: 'info'
        });
      });
    }
  },
  mounted() {
    this.$bus.$on('refreshMenuList', () => {
      this.$store.state.hasRoute = false;
      this.getMenuList();
    });
  },
  created() {
    this.menuList = this.$store.state.menuList;
  },
  components: {
    MenuAdd,
    MenuEdit
  }
}
</script>

<style scoped>
.mainContainer {
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 5px grey;
  padding-left: 30px;
  padding-right: 30px;
}
.mainHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -10px;
}
h1 {
  margin-left: -15px;
}
.el-table {
  margin-bottom: 50px;
}
</style>
