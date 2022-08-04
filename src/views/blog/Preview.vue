<template>
  <div>
    <Vditor ref="markdownEditor" />
  </div>
</template>

<script>
import Vditor from "@/components/Vditor"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Preview",
  watch:{
    $route:{
      handler(){
        this.$axios.get('/fanBlog/blog/queryBlogByMenuId?menuId=' + this.$route.query.menuId).then(res => {
          if (res.data.code == 200) {
            this.$refs.markdownEditor.setValue(res.data.data.content);
          }
        });
      },
      immediate: true,
      deep: true,
    }
  },
  components: {
    Vditor
  },
}
</script>

<style scoped>
#preview {
    height: 100%;
    width: 100%;
}
</style>
