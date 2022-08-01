import Vue from 'vue'

export function preview() {
    const preview = {
        actions: [],
        mode: "both",
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
    }
    return preview;
}

export function emoji() {
    const emoji = {
        "+1": "👍",
        "-1": "👎",
        "100": "💯",
        "broken_heart": "💔",
        "cupid": "💘",
        "heart": "❤️",
        "heavy_heart_exclamation": "❣️",
        "pushpin": "📌",
        "question": "❓",
        "revolving_hearts": "💞",
        "x": "❌",
    }
    return emoji;
}

export function toolbar() {
    const toolbar = [
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
        "upload",
        "link",
        "table",
        "edit-mode",
        "both",
        "preview",
        "fullscreen",
        "export",
        {
            name: 'save',
            tipPosition: 'n',
            tip: '保存',
            className: 'save',
            icon: '<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>保存</title> <g id="保存" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="编组备份"><rect id="Rectangle-4" x="0" y="0" width="16" height="16"></rect> <path d="M14,0 C15.1045695,0 16,0.8954305 16,2 L16,14 C16,15.1045695 15.1045695,16 14,16 L2,16 C0.8954305,16 0,15.1045695 0,14 L0,2 C0,0.8954305 0.8954305,0 2,0 L14,0 Z M14,2 L2,2 L2,14 L14,14 L14,2 Z" id="矩形" fill="#555666" fill-rule="nonzero"></path> <rect id="矩形" fill="#555666" x="4" y="2" width="4" height="4"></rect> <polygon id="路径" fill="#555666" fill-rule="nonzero" points="13 2 13 6 5 6 5 4 11 4 11 2"></polygon></g></g></svg>',
            click() {
                Vue.prototype.$bus.$emit('save');
            }
        },
        {
            name: "more",
            toolbar: [
                "undo",
                "redo",
                "record",
                "insert-after",
                "insert-before",
                "outline",
                "code-theme",
                "content-theme",
                "devtools",
                "info",
                "help",
            ],
        },
    ];
    return toolbar;
}