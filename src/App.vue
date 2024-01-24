<script setup>
import Sidemenu from './pages/Sidemenu.vue';
import CodeEditor from './pages/CodeEditor.vue';
import IframeContainer from './pages/IframeContainer.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="300px">
        <Sidemenu></Sidemenu>
      </el-aside>
      <el-main>
        <iframe-container></iframe-container>
      </el-main>
      <el-aside width="600px">
        <code-editor></code-editor>
      </el-aside>
    </el-container>
  </div>
</template>

<style scoped>
.el-container {
  height: 100%;
}
</style>
