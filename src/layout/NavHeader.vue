<template>
  <el-row>
    <el-col :span="24">
      <el-button-group>
        <el-button
            v-show="!$store.state.isCollapse"
            @click="$store.state.isCollapse = !$store.state.isCollapse"
            icon="el-icon-s-fold"
        ></el-button>
        <el-button
            v-show="$store.state.isCollapse"
            @click="$store.state.isCollapse = !$store.state.isCollapse"
            icon="el-icon-s-unfold"
        ></el-button>
      </el-button-group>
      <el-avatar :src="avatar" :size="40"></el-avatar>
    </el-col>
  </el-row>
</template>

<script>
import avatar from '@/assets/img/avatar.jpg';

export default {
  name: 'NavHeader',
  data() {
    return {
      avatar: avatar,
    };
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
  line-height: 50px;
}
.el-button {
  color: #575757;
  height: 50px;
  border: none;
  font-size: 18px;
}
.el-avatar {
  margin-right: 25px;
}
</style>
