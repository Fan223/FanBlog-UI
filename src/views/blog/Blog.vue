<template>
  <div>
    <div style="display: flex; height: 50px; background-color: #24292e;">
      <div style="margin-left: 20px; min-width: 120px; color: #fff; line-height: 50px">
        <el-icon class="el-icon-arrow-left"></el-icon>
        博客管理
      </div>
      <div style="margin-top: 4px; width: 80%">
        <el-form ref="editForm" :model="editForm">
          <el-form-item prop="title">
            <el-input v-model="editForm.title" placeholder="请输入标题" maxlength="100" show-word-limit>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-left: 10px; min-width: 120px; line-height: 50px">
        <el-button type="primary" size="medium" round @click="addBlog">发布博客</el-button>
      </div>
    </div>
    <div style="border-top: 1px solid #ccc">
      <el-form ref="editForm" :model="editForm">
        <el-form-item prop="content">
          <Vditor ref="markdownEditor"></Vditor>
        </el-form-item>
      </el-form>
    </div>
    <BlogAdd />
  </div>
</template>

<script>
import "@/assets/js/vditor.js"
import Vditor from "@/components/Vditor"
import BlogAdd from "@/views/blog/BlogAdd";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Blog',
  data() {
    return {
      editForm: {
        title: '',
        content: '',
        blogId: '',
      },
    }
  },
  methods: {
    addBlog() {
      this.editForm.content = this.$refs.markdownEditor.getValue();
      this.$bus.$emit('addBlog', this.editForm);
    }
  },
  components: {
    Vditor,
    BlogAdd
  },
  mounted() {
    this.$bus.$on('saveBlog', () => {
      this.editForm.content = this.$refs.markdownEditor.getValue();
      this.$axios.post('/fanBlog/blog/saveBlog', this.editForm).then(res => {
        if (res.data.code == 200) {
          res.data.msg == '保存成功' ? this.$message.success('保存成功') : '';
          this.editForm.blogId = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    });

    this.$bus.$on('save', () => {
      this.editForm.content = this.$refs.markdownEditor.getValue();
    });
  },
}
</script>

<style scope>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
