<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route(to) {
      console.log(to)
      if (to.name !== 'Preview' && to.path !== '/login' && to.name !== 'AddBlog') {
        let obj = {
          menuName: to.name,
          path: to.path,
          menuId: to.query.menuId,
        }
        this.$store.commit('ADD_TAB', obj)
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
