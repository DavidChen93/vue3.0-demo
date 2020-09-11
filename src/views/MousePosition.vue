<template>
  当前鼠标x：{{ x }},y：{{ y }}
</template>

<script>
import usePosition from '@/hooks/usePosition'

export default {
  name: 'MousePosition',

  setup() {
    // 方法一：需要hooks使用toRefs，否则会失去响应式
    // const {x, y} = usePosition()
    // return { x, y }

    // 方法二：需要hooks使用toRefs，否则会失去响应式
    return { ...usePosition() }

    // 方法三：目前唯一能保持响应式的方法
    // return {
    //   pos: usePosition()
    // }
  }
}
</script>
