<script setup>
import { useMonacoEditor } from '../hooks/useMonacoEditor.hook'
import { onMounted, computed, watch } from 'vue';

const props = defineProps({
    width: {
        type: [String, Number],
        default: "100%",
    },
    height: {
        type: [String, Number],
        default: "100%",
    },
    language: {
        type: String,
        default: "javascript",
    },
    editorOption: {
        type: Function,
        default: () => ({}),
    },
    modelValue: {
        type: String,
        default: '',
    },
})

const emits = defineEmits(['blue', 'update:modelValue'])

const monacoeditorStyle = computed(() => {
    return {
        width: typeof props.width === 'string' ? props.width : props.width + 'px',
        height: typeof props.height === 'string' ? props.height : props.height + 'px',
    }
})

const { monacEditorRef, createEditor, updateVal, updateOptions, getEditor } = useMonacoEditor(props.language)

onMounted(() => {
    const monacoEditor = createEditor(props.editorOption)

    updateMonacoVal(props.modelValue)
    monacoEditor?.onDidChangeModelContent(() => {
        emits('update:modelValue', monacoEditor?.getValue())
    })
    monacoEditor?.onDidBlurEditorText(() => {
        emits('blue')
    })
})

watch(() => props.modelValue, () => {
    updateMonacoVal(props.modelValue)
})

function updateMonacoVal(val) {
    if (val != getEditor()?.getValue()) {
        updateVal(val)
    }
}

defineExpose({ updateOptions, updateMonacoVal })
</script>
<template>
    <div ref="monacEditorRef" :style="monacoeditorStyle"></div>
</template>