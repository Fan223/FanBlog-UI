<template>
  <el-menu
    default-active="1-1"
    class="el-menu-vertical-demo"
    :collapse="this.$store.state.isCollapse"
    :collapse-transition="false"
    background-color="#35363a"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <router-link to="/home">
      <el-menu-item index="Home">
        <i class='el-icon-s-home'></i>
        <span slot="title"> 首页 </span>
      </el-menu-item>
    </router-link>
    <router-link to="/menu">
      <el-menu-item index="Menu">
        <i class='el-icon-menu'></i>
        <span slot="title"> 菜单管理 </span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {

  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
a {
  text-decoration: none;
}
</style>
