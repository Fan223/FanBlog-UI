<template>
  <div>
    <div id="preview"></div>
    <div id="outline"></div>
  </div>
</template>

<script>
import Vditor from "vditor"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Preview",
  data() {
    return {
      content: '',
    }
  },
  created() {
    const initOutline = () => {
      const headingElements = []
      Array.from(document.getElementById('preview').children).forEach((item) => {
        if (item.tagName.length === 2 && item.tagName !== 'HR' && item.tagName.indexOf('H') === 0) {
          headingElements.push(item)
        }
      })

      let toc = []
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY
        toc = []
        headingElements.forEach((item) => {
          toc.push({
            id: item.id,
            offsetTop: item.offsetTop,
          })
        })

        const currentElement = document.querySelector('.vditor-outline__item--current')
        for (let i = 0, iMax = toc.length; i < iMax; i++) {
          if (scrollTop < toc[i].offsetTop - 30) {
            if (currentElement) {
              currentElement.classList.remove('vditor-outline__item--current')
            }
            let index = i > 0 ? i - 1 : 0
            document.querySelector('span[data-target-id="' + toc[index].id + '"]').classList.add('vditor-outline__item--current')
            break
          }
        }
      })
    }
    this.$axios.get('/fanBlog/blog/queryBlogByMenuId?menuId=a1a82f69-a5c4-454b-a333-7c3cc46842bc')
        .then(res => {
          console.log(res)
          Vditor.preview(document.getElementById('preview'),
              res.data.data.content, {
                speech: {
                  enable: true,
                },
                anchor: 1,
                after() {
                  if (window.innerWidth <= 768) {
                    return
                  }
                  const outlineElement = document.getElementById('outline')
                  Vditor.outlineRender(document.getElementById('preview'), outlineElement)
                  if (outlineElement.innerText.trim() !== '') {
                    outlineElement.style.display = 'block'
                    initOutline()
                  }
                },
              })
        })
  }
}
</script>
<style scoped>
#preview {
  height: 100%;
  width: 100%;
}
</style>
