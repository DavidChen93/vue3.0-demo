<template>
  <button @click="mulitple">我被点了{{ state.count }}次</button>
  值是{{ result }}
</template>

<script>
import { setup, ref, reactive, computed, watchEffect } from 'vue'

export default {
  name: 'Multiplier',

  setup() {
    const state = reactive({
      count: 0
    })

    const result = ref(1)

    const mulitple = () => {
      state.count++
    }

    watchEffect(() => {
      result.value *= (state.count + 1)
    })

    return {
      state,
      result,
      mulitple
    }
  }
}
</script>
