<template>
  <div id="vditor"></div>
</template>

<script>
import Vditor from "vditor"
import "vditor/dist/index.css"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data() {
    return {
      contentEditor: '',
    }
  },
  mounted() {
    this.contentEditor = new Vditor('vditor', {
      minHeight: 520,
      toolbarConfig: {
        pin: true,
        hide: false
      },
      outline: {
        enable: true,
        position: "right"
      },
      cache: {
        enable: false,
      },
      theme: "dark",
      lang: 'zh_CN',
      mode: "wysiwyg",
      icon: "material",
      placeholder: "请输入正文内容",
      preview: {
        markdown: {
          autoSpace: true,
          paragraphBeginningSpace: true,
          mark: true,
          listStyle: true
        },
        theme: {
          current: "dark"
        },
        hljs: {
          "lineNumber": true
        }
      },
      hint: {
        emojiTail: "设置常用表情",
        emoji: {
          "sad": "💔",
          "love": "❤️",
          "cheer": "🎉️",
          "rocket": "🚀️",
          "eye": "👀️",
          "cat": "🐱️",
          "rabbit": "🐰️",
          "good": "👍",
          "j": "https://cdn.jsdelivr.net/npm/vditor@1.3.1/dist/images/emoji/j.png"
        },
      },
      counter: {
        "enable": true
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
    }
  },
  methods: {
    getValue() {
      return this.contentEditor.getValue(); // 获取 Markdown 内容
    }
  },
}
</script>