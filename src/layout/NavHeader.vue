<template>
  <el-row>
    <el-col :span="24">
      <el-button-group>
        <el-button
            v-show="!$store.state.isCollapse"
            @click="$store.state.isCollapse = !$store.state.isCollapse"
            icon="el-icon-s-fold"
            size="medium"
        ></el-button>
        <el-button
            v-show="$store.state.isCollapse"
            @click="$store.state.isCollapse = !$store.state.isCollapse"
            icon="el-icon-s-unfold"
            size="medium"
        ></el-button>
      </el-button-group>
      <div>
        <!--      <router-link to="/blog/add">-->
        <el-avatar style="vertical-align: middle;" :src="avatar" :size="45">
        </el-avatar>
        <!--      </router-link>-->
      </div>
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
  line-height: 60px;
}

a {
  text-decoration: none;
}
</style>
