<template>
  计数器：<span>{{ count }}</span>
  <button @click="countPlus">{{ plusText }}</button>
  <button @click="countMinus">{{ minusText }}</button>
</template>

<script>
import { setup, ref } from 'vue'

export default {
  name: 'Counter',

  setup() {
    // 非响应式基础类型数据
    const plusText = '增加'
    const minusText = '减少'

    const count = ref(0)

    const countPlus = () => {
      count.value++
    }

    const countMinus = () => {
      count.value--
    }
    
    return {
      plusText,
      minusText,
      count,
      countPlus,
      countMinus
    }
  }
}
</script>