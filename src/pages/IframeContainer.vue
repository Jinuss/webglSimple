<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia';
import { useCommonStore } from '../store/commonStore';

const commonStore = useCommonStore()

const store = storeToRefs(commonStore)

const { codeContent, currentSrc } = store

const src = ref(currentSrc)
const iframeRef = ref()

watch(codeContent, (htmlContent) => {
  var blob = new Blob([htmlContent], { type: 'text/html' });
  var url = URL.createObjectURL(blob);
  src.value = url;
})
</script>

<template>
  <div id="iframeconatiner">
    <iframe ref="iframeRef" :src="src"></iframe>
  </div>
</template>

<style scoped>
#iframeconatiner {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

iframe {
  height: 100%;
  width: 100%;
  border: none;
}
</style>
