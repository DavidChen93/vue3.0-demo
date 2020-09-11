<template>
  数字：<input type="number" :value="number" @input="numberInput" />
  文本：<input type="text" :value="text" @input="textInput" />
</template>

<script>
import { setup } from 'vue'
export default {
  name: 'MyInput',

  props: {
    number: Number,
    text: String
  },

  setup(props, ctx) {
    console.log(ctx)
    const numberInput = e => {
      ctx.emit('update:number', e.target.value)
    }

    const textInput = e => {
      ctx.emit('update:text', e.target.value)
    }

    return {
      numberInput,
      textInput
    }
  }
}
</script>
