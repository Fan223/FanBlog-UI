<template>
  <div>
    <Vditor ref="markdownEditor" flag="preview" :content="content"/>
  </div>
</template>

<script>
import Vditor from "@/components/Vditor"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Preview",
  data() {
    return {
      content: '',
    }
  },
  watch:{
    $route:{
      handler(){
        this.$axios.get('/fanBlog/blog/queryBlogByMenuId?menuId=' + this.$route.query.menuId).then(res => {
          if (res.data.code == 200) {
            this.content = res.data.data.content;
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
