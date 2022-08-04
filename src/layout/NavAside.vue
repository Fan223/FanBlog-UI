<template>
  <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      :collapse="this.$store.state.isCollapse"
      :collapse-transition="false"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
  >
    <el-menu-item index="title" @click="$router.go(0)">
      <i class="el-icon-menu" v-show="$store.state.isCollapse"></i>
      <i class="el-icon-menu" v-show="!$store.state.isCollapse"></i>
      <span slot="title"> <b> FanBlog</b> </span>
    </el-menu-item>

    <router-link to="/home">
      <el-menu-item index="Home">
        <i class='el-icon-s-home'></i>
        <span slot="title"> 首页 </span>
      </el-menu-item>
    </router-link>

    <template v-for="menu in menuList">
      <el-submenu v-if="menu.children && menu.children.length > 0"
        :key="menu.menuId"
        :index="menu.menuId">
        <template slot="title">
          <i :class=menu.icon></i>
          <span slot="title"> {{ menu.menuName }} </span>
        </template>

        <template v-for="child in menu.children">
          <router-link :to="{
            path: child.path,
            query: {
              menuId: child.menuId
            }
          }" :key="child.menuId">
            <el-menu-item :index="child.menuId">
              <i :class=child.icon></i>
              <span slot="title"> {{ child.menuName }} </span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

      <router-link v-else :to="menu.path" :key="menu.menuId">
        <el-menu-item :index="menu.menuId">
          <i :class=menu.icon></i>
          <span slot="title"> {{ menu.menuName }} </span>
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'NavAside',
  computed: {
    menuList() {
      return this.$store.state.menuList;
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  border: none;
}
.el-menu-vertical-demo{
  border: none;
}

a {
  text-decoration: none;
}
</style>
