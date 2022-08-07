<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route(to) {
      if (to.path !== '/login') {
        let obj = {
          menuName: to.name,
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
