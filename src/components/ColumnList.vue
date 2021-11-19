<template>
    <div class="row">
    <div v-for="item in columnList" :key="item.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img  :src="item.avatar" :alt="item.title" class="rounded-circle border border-light w-25 my-3" >
          <h5 class="card-title">{{item.title}}</h5>
          <p class="card-text text-left">{{item.description}}</p>
          <router-link :to="`/column/${item.id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ColumnProps } from '../testData'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      required: true,
      type: Array as PropType<ColumnProps[]>
    }
  },
  setup (props) {
    const columnList = computed(() => {
      // 判断如果图片地址为空，则传入一个默认的地址
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/avatar.jpg')
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style scoped>

</style>
