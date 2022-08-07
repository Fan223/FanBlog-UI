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
            icon: '<svg width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1536 1536"><path fill="currentColor" d="M384 1408h768v-384H384v384zm896 0h128V512q0-14-10-38.5t-20-34.5l-281-281q-10-10-34-20t-39-10v416q0 40-28 68t-68 28H352q-40 0-68-28t-28-68V128H128v1280h128V992q0-40 28-68t68-28h832q40 0 68 28t28 68v416zM896 480V160q0-13-9.5-22.5T864 128H672q-13 0-22.5 9.5T640 160v320q0 13 9.5 22.5T672 512h192q13 0 22.5-9.5T896 480zm640 32v928q0 40-28 68t-68 28H96q-40 0-68-28t-28-68V96q0-40 28-68T96 0h928q40 0 88 20t76 48l280 280q28 28 48 76t20 88z"></path></svg>',
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
