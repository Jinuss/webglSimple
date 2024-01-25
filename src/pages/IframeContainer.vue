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
  // fs.writeFile('./put.html', htmlContent, err => {
  //   console.log(err)
  // })
  const iframeDoc = iframeRef.value.contentDocument || iframeRef.value.contentWindow.document
  console.log("🚀 ~ watch ~ iframeRef:", iframeRef)
  iframeDoc.open();
  iframeDoc.write(htmlContent);
  iframeDoc.close();
})
</script>

<template>
  <div id="iframeconatiner">
    <iframe :src="src" ref="iframeRef"></iframe>
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
  border-radius: 4px;
}
</style>
