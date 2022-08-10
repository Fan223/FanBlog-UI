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
        :label="tab.label"
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
      if (targetName === 'Home') {
        return false;
      }

      let tabs = this.tabs;
      let activeName = this.tabValue;
      let address = '';

      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              address = nextTab.label;
            }
          }
        });
      }
      this.tabValue = activeName;
      console.log(tabs);
      let filter = tabs.filter(tab => {
        console.log(tab.name + ' ' + targetName);
        return tab.name !== targetName
      });
      console.log(filter);
      this.tabs = filter;
      // console.log(this.tabs)
      this.$router.push({name: address});
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
/*导航条下方边框*/
/*/deep/ .el-tabs__nav-scroll{*/
/*  border-bottom: 1px solid #000000;*/
/*  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);*/
/*}*/
/*!* 导航条下方边框阴影*!*/
/*/deep/ .el-tabs__nav-wrap {*/
/*  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15) ;*/
/*}*/
/*!*切换项下面的长条，控制其长度*!*/
/*/deep/ .el-tabs__active-bar.is-top{*/
/*  text-align: center;*/
/*  width: 0px !important;      !* 不加important  不会生效，important会覆盖行内样式权限级别*!*/
/*  padding: 0 50px !important; !* 控制位置*!*/
/*  left:8.5%;                  !* 根据实际情设置，尽量居中就行*!*/
/*  box-sizing: border-box;*/
/*  background-clip: content-box;*/
/*}*/
/*/deep/ .el-tabs__item.is-active{    !* 切换活动项的文字颜色 *!*/
/*color: #000000 !important;*/
/*}*/
/*/deep/ .el-tabs__active-bar{*/
/*  background-color: #229922 !important;   !* 切换活动项的长条颜色 *!*/
/*}*/
</style>
