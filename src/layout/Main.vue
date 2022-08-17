<template>
  <el-container class="layout">
    <el-aside width="auto">
      <NavAside />
    </el-aside>

    <el-container>
      <el-header height="50px">
        <NavHeader />
      </el-header>
      <Tabs />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavAside from './NavAside.vue'
import NavHeader from './NavHeader.vue'
import Tabs from './Tabs.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Main',
  components: {
    NavAside,
    NavHeader,
    Tabs
  }
};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100vh;
}
.el-aside {
  background-color: #001529;
}
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
  background-color: #f0f2f5;
}
</style>
