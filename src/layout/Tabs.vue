<template>
  <el-tabs
      v-model="$store.state.tabValue"
      type="card"
      :closable="true"
      @tab-remove="removeTab"
      @tab-click="clickTab">
    <el-tab-pane
        v-for="tab in $store.state.tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name">
    </el-tab-pane>
  </el-tabs>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tabs',
  methods: {
    removeTab(targetName) {
      if (targetName === 'Home') {
        return false;
      }

      let tabs = this.$store.state.tabs;
      let activeName = this.$store.state.tabValue;
      let nextTab = {};

      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.$store.state.tabValue = activeName;
      this.$store.state.tabs = tabs.filter(tab => tab.name !== targetName);
      this.$router.push({
        name: nextTab.label,
        params: {
          menuId: nextTab.name
        }
      });
    },
    clickTab(tab) {
      this.$router.push({
        name: tab.label,
        params: {
          menuId: tab.name
        }
      });
    }
  }
}
</script>

<style scoped>
.el-tabs {
  height: 42px;
}
/*导航条边框*/
::v-deep .el-tabs__nav-scroll {
  border-top: 1px solid #ddd;
}
</style>
