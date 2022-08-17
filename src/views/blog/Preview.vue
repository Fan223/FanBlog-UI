<template>
  <div style="height: 100%">
    <el-form ref="editForm" :model="editForm">
      <el-form-item prop="content">
<!--        <Vditor ref="markdownEditor" flag="preview" :content="editForm.content"/>-->
        <Vditor ref="markdownEditor" flag="preview"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vditor from "@/components/Vditor"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Preview",
  data() {
    return {
      editForm: {
        blogId: '',
        content: '',
      },
    }
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.params.menuId) {
          this.$axios.get('/fanBlog/blog/queryBlogByMenuId?menuId=' + this.$route.params.menuId).then(res => {
            if (res.data.code == 200) {
              this.$refs.markdownEditor.createVditor(res.data.data.content);
              this.editForm.content = res.data.data.content;
              this.editForm.blogId = this.$route.params.menuId;
              localStorage.setItem('content', this.editForm.content);
            }
          });
        } else {
          this.editForm.content = localStorage.getItem('content');
          this.editForm.blogId = JSON.parse(localStorage.getItem('tab')).menuId;
          this.$nextTick(() => {
            this.$refs.markdownEditor.createVditor(this.editForm.content);
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.$bus.$on('saveBlog', () => {
      this.editForm.content = this.$refs.markdownEditor.getValue();
      this.$axios.post('/fanBlog/blog/saveBlog', this.editForm).then(res => {
        if (res.data.code == 200) {
          this.$message.success('保存成功');
        } else {
          this.$message.error(res.data.msg);
        }
      });
    });
  },
  components: {
    Vditor
  },
}
</script>
