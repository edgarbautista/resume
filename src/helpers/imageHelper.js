export const loadImages = async (images) => {
  const loaded = []
  return images.map((src) => new Promise(resolve => {
    if (!loaded.includes(src)) {
      loaded.push(src)
      imageLoader(src).onload = () => resolve(src)
    } else {
      resolve()
    }
    }))
}

export const loadImagesSync = (images) => {
  const loaded = []
  return images.map((src) => {
    if (!loaded.includes(src)) { 
      loaded.push(src)
      return imageLoader(src) 
    }
    return null
  }).filter(img => !!img)
}

const imageLoader = (src) => {
  const img = new Image()
  img.src = src  
  return img
}

export const imageIndex = (options) => {
  const { direction, size, currentIdx } = options
  const forwardDirection = direction
  const forwardValue = currentIdx + 1
  const backValue = currentIdx - 1
  const movingForward = (forwardDirection && currentIdx < size) || currentIdx === 0
  return { index: movingForward ? forwardValue : backValue, direction: movingForward }
}
