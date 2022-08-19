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
  methods: {
    setBlog(blogId, content) {
      this.$nextTick(() => {
        this.$refs.markdownEditor.createVditor(content);
      })

      this.editForm.content = content;
      this.editForm.blogId = blogId;
      localStorage.setItem('content', content);
    }
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.params.menuId) {
          if (this.$store.state.blogs.has(this.$route.params.menuId)) {
            this.setBlog(this.$route.params.menuId, this.$store.state.blogs.get(this.$route.params.menuId))
          } else {
            this.$axios.get('/fanBlog/blog/queryBlogByMenuId?menuId=' + this.$route.params.menuId).then(res => {
              if (res.data.code == 200) {
                this.setBlog(res.data.data.blogId, res.data.data.content)
                this.$store.state.blogs.set(res.data.data.blogId, res.data.data.content)
              }
            });
          }
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
