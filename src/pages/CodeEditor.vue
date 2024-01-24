<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '../store/commonStore';
import MonacoEditor from '../components/MonacoEditor.vue';

const store = useCommonStore()

const { currentSrc } = storeToRefs(store)

let constState = null

let initStateRef = ref()

const getContent = () => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', currentSrc.value, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      initStateRef.value = xhr.responseText;
      constState = xhr.responseText
    }
  }
  xhr.send();
}

watchEffect(getContent)

onMounted(() => {
  getContent()
})

const current = ref()
const getModelValue = (val) => {
  current.value = val
}

const handleRun = () => {
  if (current.value !== initStateRef.value) {
    store.setCodeContent(current.value)
  }
}

const MonacoEditorRef = ref()

const handleRest = () => {
  if (current.value !== constState) {
    store.setCodeContent(constState)
    if (MonacoEditorRef?.value?.updateMonacoVal) {
      MonacoEditorRef.value.updateMonacoVal(constState)
    }
  }
}

</script>

<template>
  <div class="codePanel">
    <div class="actionPanel">
      <span><el-icon>
          <CopyDocument />
        </el-icon>复制</span>
      <span @click="handleRest"><el-icon>
          <RefreshLeft />
        </el-icon>重置</span>
      <span @click="handleRun"><el-icon>
          <VideoPlay />
        </el-icon>运行</span>
    </div>
    <div className="codecontent">
      <monaco-editor ref="MonacoEditorRef" :modelValue="initStateRef" @update:modelValue="getModelValue"
        language="html" />
    </div>
  </div>
</template>

<style scoped>
.codePanel {
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.actionPanel {
  background: mediumvioletred;
  color: #fff;
  height: 32px;
  line-height: 32px;
  border-radius: 4px 4px 0 0;

  span {
    margin: 0 4px;
    display: inline-flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    cursor: pointer;
  }
}

.codecontent {
  flex: 1;
  border-radius: 0 0 4px 4px;
}
</style>
