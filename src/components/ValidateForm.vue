<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <!--具名插槽-->
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    let funcArray: ValidateFunc[] = []
    const submitForm = () => {
      // 循环执行数组 得到最后的验证结果
      const result = funcArray.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    // 将监听得到的验证函数都存到一个数组中
    const callback = (func: any) => {
      funcArray.push(func)
    }
    // const callback = (text: string | undefined) => {
    //   console.log(text)
    // }
    // const callback = (func : ValidateFunc) => {
    //   funcArray.push(func)
    // }
    // 添加监听
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      // 删除监听
      emitter.off('form-item-created', callback)
      funcArray = []
    })
    return { submitForm }
  }
})
</script>

<style scoped>

</style>
