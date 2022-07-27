<template>
  <div>
    <el-button-group>
      <el-button
        v-show="!$store.state.isCollapse"
        @click="$store.commit('HANDLE_COLLAPSE')"
        icon="el-icon-s-fold"
      ></el-button>
      <el-button
        v-show="$store.state.isCollapse"
        @click="$store.commit('HANDLE_COLLAPSE')"
        icon="el-icon-s-unfold"
      ></el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'NavHeader',
  data() {
    return {

    }
  },
}
</script>

<style scoped>
.el-button-group {
  margin-left: 50px;
}
</style>