const defineVw = () => {
  document.documentElement.style.setProperty(
    '--vw',
    `${document.documentElement.clientWidth / 100}px`
  )
}

const defineVh = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
}

const defineDevicePixelRatio = () => {
  document.documentElement.style.setProperty(
    '--device-pixel-ratio',
    window.devicePixelRatio.toString()
  )
}

const defineViewportVariables = () => {
  defineVw()
  defineVh()
  defineDevicePixelRatio()
}

const useViewportUnitSizes = () => {
  onMounted(() => {
    defineViewportVariables()
    window.addEventListener('resize', defineViewportVariables, { passive: true })
  })
  onUnmounted(() => {
    window.removeEventListener('resize', defineViewportVariables)
  })
}

export default useViewportUnitSizes
