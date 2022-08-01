<template>
  <div>
    <Vditor ref="markdownEditor"></Vditor>
  </div>
</template>

<script>
import Vditor from "@/components/Vditor/index.vue"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Test",
  data() {
    return {
    }
  },
  methods: {
  },
  created() {
    this.$axios.get('/fanBlog/blog/queryAllBlog').then(res => {
      this.$refs.markdownEditor.setValue(res.data.data[0].content);
    });
  },
  components: {
    Vditor
  },
}
</script>
