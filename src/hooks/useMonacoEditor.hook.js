import * as monaco from 'monaco-editor'
import { ref, nextTick, onBeforeUnmount } from 'vue'

export function useMonacoEditor(language = 'javascript') {
    let monacEditor = null

    const monacEditorRef = ref(null)

    function createEditor(editorOption = {}) {
        if (!monacEditorRef.value) {
            return
        }

        monacEditor = monaco.editor.create(monacEditorRef.value, {
            //初始化模型
            model: monaco.editor.createModel('', language),
            //是否启用预览图
            minimap: { enabled: false },
            //圆角
            roundedSelection: true,
            //主题
            theme: 'vs-dark',
            //主键
            multiCursorModifier: 'ctrlCmd',
            //滚动条
            scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8
            },
            //行号
            lineNumbers: 'on',
            //tab大小
            tabSize: 2,
            //字体大小
            fontSize: 16,
            //控制编辑器是否自动调整缩进
            autoIndent: 'advanced',
            //自动布局
            automaticLayout: true,
            ...editorOption
        })

        return monacEditor
    }



    //格式化
    async function formatDoc() {
        await monacEditor?.getAction('editor.action.formatDocument')?.run()
    }

    //数据更新
    function updateVal(val) {
        nextTick(() => {
            if (getOption(monaco.editor.EditorOption.readOnly)) {
                updateOptions({ readOnly: false })
            }
            monacEditor?.setValue(val)
            setTimeout(async () => {
                await formatDoc()
            }, 10)
        })
    }

    //配置更新
    function updateOptions(opt) {
        monacEditor?.updateOptions(opt)
    }

    //获取配置
    function getOption(name) {
        return monacEditor?.getOption(name)
    }

    //获取实例
    function getEditor() {
        return monacEditor
    }

    onBeforeUnmount(() => {
        if (monacEditor) {
            monacEditor.dispose()
        }
    })

    return { monacEditorRef, createEditor, getEditor, updateVal, updateOptions, getOption, formatDoc }
}