<template>
  <div>
    <el-row type="flex" align="middle" style="height: 50px; background-color: #24292e;">
      <el-col :span="2" style="min-width: 120px; color: #fff">
        <div style="margin-left: 20px;">
          <el-icon class="el-icon-arrow-left"></el-icon>
          博客管理
        </div>
      </el-col>
      <el-col :span="20">
        <div style="margin-top: 20px">
          <el-form ref="editForm" :model="editForm">
            <el-form-item prop="title">
              <el-input v-model="editForm.title" placeholder="请输入标题" maxlength="100" show-word-limit>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="2" style="min-width: 120px">
        <div style="margin-left: 10px">
          <el-button type="primary" size="medium" round @click="addBlog">发布博客</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="border-top: 1px solid #ccc;">
      <el-col :span="24">
        <el-form ref="editForm" :model="editForm">
          <el-form-item prop="content">
            <Vditor ref="markdownEditor" v-model="editForm.content"></Vditor>
          </el-form-item>
          <el-button @click="save">保存</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vditor from "@/components/Vditor"

export default {
  name: 'AddBlog',
  data() {
    return {
      editForm: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    save() {
      this.editForm.content = this.$refs.markdownEditor.getValue();
    },
    addBlog() {
      this.$axios.post('/fanBlog/blog/addBlog', this.editForm).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: '发布成功',
            type: 'success'
          });
          this.$router.go(-1);
        } else {
          this.$message({
            message: '发布失败',
            type: 'error'
          });
        }
      })
    },
  },
  components: {
    Vditor
  },
}
</script>

<style scope>
</style>