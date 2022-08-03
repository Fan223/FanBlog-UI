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
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/></svg>',
            click() {
                Vue.prototype.$bus.$emit('saveBlog');
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
