<template>
  <el-row>
    <el-col :span="24">
      <el-button-group>
        <el-button
            v-show="!$store.state.isCollapse"
            @click="$store.commit('HANDLE_COLLAPSE')"
            icon="el-icon-s-fold"
            size="medium"
        ></el-button>
        <el-button
            v-show="$store.state.isCollapse"
            @click="$store.commit('HANDLE_COLLAPSE')"
            icon="el-icon-s-unfold"
            size="medium"
        ></el-button>
      </el-button-group>
      <router-link to="/blog/add">
        <b style="color: #ffffff">发布博客</b>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'NavHeader',
  data() {
    return {}
  },
}
</script>

<style scoped>
.el-row {
  color: #fff;
}
.el-col {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 60px;
}
.el-button-group {
  margin-left: 10px;
}
a {
  text-decoration: none;
}
</style>