import { reactive, toRefs, onMounted, onUnmounted } from 'vue'

const usePosition = () => {
  const position = reactive({
    x: 0,
    y: 0
  })

  const updatePosition = (e) => {
    position.x = e.pageX
    position.y = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', updatePosition)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updatePosition)
  })

  // 如果直接返回reactive对象，就会出现鼠标坐标例子中方法一和方法二中的问题
  // return position

  // 讲reactive对象转换成ref属性
  return toRefs(position)
}

export default usePosition