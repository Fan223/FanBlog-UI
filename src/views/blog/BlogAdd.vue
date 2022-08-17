<template>
  <div style="height: 100vh">
    <div style="display: flex; height: 50px; background-color: #24292e;">
      <router-link :to="{
        name: '博客管理',
        params: {
          menuId: '5579ef3b-225b-4103-993c-2360ab5bc79e'
        }
      }">
        <div style="margin-left: 20px; min-width: 120px; color: #fff; line-height: 50px">
          <el-icon class="el-icon-arrow-left"></el-icon>
          博客管理
        </div>
      </router-link>
      <div style="margin-top: 4px; width: 80%">
        <el-form ref="editForm" :model="editForm">
          <el-form-item prop="title">
            <el-input v-model="editForm.title" placeholder="请输入标题" maxlength="100" show-word-limit>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-left: 10px; min-width: 120px; line-height: 50px">
        <el-button type="medium" round @click="addBlog">发布文章</el-button>
      </div>
    </div>
    <div style="border-top: 1px solid #ccc">
      <el-form ref="editForm" :model="editForm">
        <el-form-item prop="content">
          <Vditor ref="markdownEditor"></Vditor>
        </el-form-item>
      </el-form>
    </div>
    <BlogAddDialog />
  </div>
</template>

<script>
import "@/assets/js/vditor.js"
import Vditor from "@/components/Vditor"
import BlogAddDialog from "@/views/blog/BlogAddDialog";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'BlogAdd',
  data() {
    return {
      editForm: {
        blogId: '',
        title: '',
        content: '',
      },
    }
  },
  methods: {
    addBlog() {
      this.editForm.content = this.$refs.markdownEditor.getValue();
      this.$bus.$emit('addBlogDialog', this.editForm);
    },
  },
  components: {
    Vditor,
    BlogAddDialog
  },
  mounted() {
    this.$bus.$on('saveBlog', () => {
      this.editForm.content = this.$refs.markdownEditor.getValue();
      this.$axios.post('/fanBlog/blog/saveBlog', this.editForm).then(res => {
        if (res.data.code == 200) {
          this.$message.success('保存成功');
          this.editForm = res.data.data;
          this.$store.state.hasRoute = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    });

    if (this.$route.params.flag) {
      this.editForm.blogId = this.$route.params.blogId;
      this.editForm.title = this.$route.params.title;
      this.editForm.content = this.$route.params.content;
      this.$refs.markdownEditor.createVditor(this.editForm.content);
    }
  },
}
</script>

<style scoped>
.el-button {
  background-color: #001529;
  border: 1px solid #ffd04b;
  color: #fff;
}
.el-button:hover {
  background-color: #ffd04b;
  /*border: 1px solid #ffd04b;*/
  color: #001529;
}
a {
  text-decoration: none;
}
</style>
