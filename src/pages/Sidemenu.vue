<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <template v-for="(item, index) in menuList" :key="item">
      <el-sub-menu :index="item.index" v-if="item?.children">
        <template #title>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item v-for="(child, i) in item.children" :index="child.index" @click="handleClick">
          <span>{{ child.title }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item :index="item.index" v-else @click="handleClick">
        <el-icon><icon-menu /></el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { useCommonStore } from '../store/commonStore';
import { menuList } from '../config';

const commonStore = useCommonStore()
const handleClick = ({ index }) => {
  let arr = []
  menuList.forEach(i => {
    if (i?.children) {
      arr.push(...i.children)
    }
    arr.push(i)
  });

  const i = arr.filter(({ index: j }) => j == index)
  console.log("🚀 ~ handleClick ~ item:", i)
  commonStore.setCuurentSrc(i[0].url)
}

</script>
<style scoped>
.el-menu-vertical-demo {
  height: 100%;
  padding: 10px 2px;
}
</style>
