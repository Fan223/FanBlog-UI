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
    this.contentEditor = new Vditor("vditor", {
      height: "100vh",
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
      comment: {
        enable: true
      },
      toolbar: [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "|",
        "line",
        "quote",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "code",
        "inline-code",
        "insert-after",
        "insert-before",
        // "undo", 撤销
        // "redo", 重做
        "upload",
        "link",
        "table",
        // "record", 录音
        "edit-mode",
        "both",
        "preview",
        "fullscreen",
        "outline",
        "code-theme",
        "content-theme",
        "export",
        {
          name: "more",
          toolbar: [
            "devtools",
            "info",
            "help",
          ],
        },
        {
          name: 'sponsor',
          tipPosition: 'n',
          tip: '保存',
          className: 'right',
          icon: '<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>保存</title> <g id="保存" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="编组备份"><rect id="Rectangle-4" x="0" y="0" width="16" height="16"></rect> <path d="M14,0 C15.1045695,0 16,0.8954305 16,2 L16,14 C16,15.1045695 15.1045695,16 14,16 L2,16 C0.8954305,16 0,15.1045695 0,14 L0,2 C0,0.8954305 0.8954305,0 2,0 L14,0 Z M14,2 L2,2 L2,14 L14,14 L14,2 Z" id="矩形" fill="#555666" fill-rule="nonzero"></path> <rect id="矩形" fill="#555666" x="4" y="2" width="4" height="4"></rect> <polygon id="路径" fill="#555666" fill-rule="nonzero" points="13 2 13 6 5 6 5 4 11 4 11 2"></polygon></g></g></svg>',
          click () {alert('捐赠地址：https://ld246.com/sponsor')},
        }
      ],
      after: () => {
        this.contentEditor.setValue(this.content)
      },
      mode: "wysiwyg",
      preview: {
        mode: "both",
        actions: [],
        markdown: {
          autoSpace: true,
          paragraphBeginningSpace: true,
          fixTermTypo: true,
          mark: true,
          listStyle: "true",
        },
        theme: {
          current: "dark",
        },
        hljs: {
          lineNumber: true,
          style: "dracula"
        },
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
      return this.contentEditor.setValue(value);     //设置 Markdown 内容
    },
    disabled () {
      return this.contentEditor.disabled();     //设置只读
    },
  },
}
</script>
