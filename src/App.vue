<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route(to) {
      if (to.name !== 'Preview' && to.path !== '/login' && to.name !== 'AddBlog' && to.params.menuId) {
        let obj = {
          menuId: to.params.menuId,
          menuName: to.name,
        }
        this.$store.commit('ADD_TAB', obj)
      } else if (!this.$route.params.menuId && to.name != '首页') {
        let tab = JSON.parse(localStorage.getItem("tab"));
        this.$store.commit('ADD_TAB', tab)
      }
    }
  },
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
</style>
