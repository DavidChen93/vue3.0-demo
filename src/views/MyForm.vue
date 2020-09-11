<template>
  <my-input v-model:number="number" v-model:text="text" />
  <p>数字:{{number}}</p>
  <p>文本:{{text}}</p>
</template>

<script>
import MyInput from '@/components/MyInput.vue'
import { setup, ref } from 'vue'
export default {
  name: 'MyForm',

  components: {
    MyInput
  },

  setup() {
    const text = ref('')
    const number = ref(0)

    return {
      text,
      number
    }
  }
}
</script>
