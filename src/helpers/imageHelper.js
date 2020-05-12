export const loadImages = async (images) => {
  return images.map((src) => new Promise(resolve => {
      const img = new Image()
      img.onload = () => resolve(src)
      img.src = src
    }))
}

export const imageIndex = (options) => {
  const { direction, size, currentIdx } = options
  const forwardDirection = direction
  const forwardValue = currentIdx + 1
  const backValue = currentIdx - 1
  const movingForward = (forwardDirection && currentIdx < size) || currentIdx === 0
  return { index: movingForward ? forwardValue : backValue, direction: movingForward }
}
