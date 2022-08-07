<template>
  <el-tabs
      v-model="tabValue"
      type="card"
      :closable="true"
      @tab-remove="removeTab"
      @tab-click="clickTab">
    <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.name"
        :name="tab.name">
    </el-tab-pane>
  </el-tabs>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tabs',
  computed: {
    tabValue: {
      get() {
        return this.$store.state.tabValue;
      },
      set(val) {
        this.$store.state.tabValue = val;
      }
    },
    tabs: {
      get() {
        return this.$store.state.tabs;
      },
      set(val) {
        this.$store.state.tabs = val;
      }
    }
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.tabs;
      let activeName = this.tabValue;

      if (targetName === '首页') {
        return false;
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.tabValue = activeName;
      this.tabs = tabs.filter(tab => tab.name !== targetName);
      this.$router.push({name: activeName});
    },
    clickTab(tab) {
      this.$router.push({name: tab.name});
    }
  }
}
</script>