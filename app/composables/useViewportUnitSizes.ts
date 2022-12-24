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

const useViewportUnitSizes = (createListener = false) => {
  onMounted(() => {
    if (!createListener) return
    defineViewportVariables()
    window.addEventListener('resize', defineViewportVariables, { passive: true })
  })
  onUnmounted(() => {
    if (!createListener) return
    window.removeEventListener('resize', defineViewportVariables)
  })

  return { defineViewportVariables }
}

export default useViewportUnitSizes
