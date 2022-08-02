<template>
  <el-container class="layout">
    <el-aside width="auto">
      <NavAside />
    </el-aside>

    <el-container>
      <el-header>
        <NavHeader />
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavAside from './NavAside.vue'
import NavHeader from './NavHeader.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Main',
  components: {
    NavAside,
    NavHeader
  }
};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100vh;
}
.el-aside {
  background-color: #545c64;
}
.el-header {
  background-color: #35363a;
}
.el-main {
  padding: 0;
}
</style>
