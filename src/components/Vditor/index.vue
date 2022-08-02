<template>
  <div id="vditor"></div>
</template>

<script>
import Vditor from "vditor"
import "vditor/dist/index.css"
import "@/assets/js/vditor.js"
import {preview, emoji, toolbar} from "@/assets/js/vditor";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data() {
    return {
      contentEditor: '',
    }
  },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: "100vh",
      minHeight: "auto",
      width: "100%",
      icon: "material",
      lang: 'zh_CN',
      theme: "dark",
      outline: {
        enable: true,
        position: "right",
      },
      toolbarConfig: {
        pin: false,
        hide: false,
      },
      cache: {
        enable: false
      },
      counter: {
        enable: true,
        type: "text"
      },
      mode: "wysiwyg",
      preview: preview(),
      placeholder: "请输入内容",
      toolbar: toolbar(),
      hint: {
        emoji: emoji(),
      },
      after: () => {
        this.contentEditor.setValue(this.content)
      },
    })
  },
  props: {
    content: {
      type: String,
      default: ""
    },
  },
  methods: {
    getValue() {
      return this.contentEditor.getValue(); // 获取 Markdown 内容
    },
    setValue (value) {
      this.contentEditor.setValue(value); // 设置 Markdown 内容
    },
  },
}
</script>

<style scoped>
#vditor {
  border: none;
}
</style>
