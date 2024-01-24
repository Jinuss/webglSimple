<template>
  <h5 class="mb-2">快捷</h5>
  <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleClick">
    <el-menu-item :index="item.index" v-for="(item, index) in menuList">
      <el-icon><icon-menu /></el-icon>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { menuList } from '../config';

const handleClick = (item) => {
  console.log("🚀 ~ handleClick ~ item:", item)
}

</script>
