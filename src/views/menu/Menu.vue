<template>
  <div class="mainContainer">
    <div class="mainHeader">
      <h1>菜单管理</h1>
      <div style="margin-right: 20px; margin-bottom: -10px">
        <el-button @click="$bus.$emit('addMenu', menuList)" type="primary"
                   size="small" style="margin-right: 20px;">新增</el-button>
        <el-button type="danger" size="small" @click="deleteMenu" style="margin-left: -10px">
          删除选中
        </el-button>
        <MenuAdd/>
      </div>
    </div>
    <div style="padding-left: 40px; padding-right: 40px;">
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
          :default-sort="{prop: 'orderNum', order: 'ascending'}"
          :tree-props="{ hasChildren: 'hasChildren', children: 'children' }">
        <el-table-column
            type="selection"
            width="55"
            align="center">
        </el-table-column>
        <el-table-column
            prop="menuName"
            label="菜单名称">
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
              文章
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="icon"
            label="菜单图标"
            width="100"
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
            <el-tag v-if="scope.row.valiFlag === 0" size="small" effect="dark" type="danger">
              禁用
            </el-tag>
            <el-tag v-if="scope.row.valiFlag === 1" size="small" effect="dark" type="success">
              正常
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            width="160">
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right" align="center">
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
    </div>
    <MenuEdit />
  </div>

</template>

<script>
import MenuAdd from "@/views/menu/MenuAdd";
import MenuEdit from "@/views/menu/MenuEdit";
import "@/assets/css/container.css";

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
        this.$store.state.menuList = res.data.data;
        this.menuList = res.data.data;
      });
    },
    deleteMenu(row) {
      this.$confirm('确认删除该菜单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let idList = [];
        if (row.menuId) {
          idList.push(row.menuId)
        } else {
          idList = this.multipleSelection.map(value => value.menuId);
        }

        this.$axios.delete('/fanBlog/menu/deleteMenu', {data: idList}).then(res => {
          if (res.data.code === 200) {
            this.$message.success("删除成功");
            this.getMenuList();
          } else {
            this.$message.error("删除失败")
          }
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    }
  },
  mounted() {
    this.$bus.$on('refreshMenuList', () => {
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
.el-table {
  margin-bottom: 30px;
}
</style>
