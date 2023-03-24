export const getProps = (defaultValues, props, key) => {
    if(props && props[key]) {
       defaultValues = Object.assign(defaultValues, props[key])
     }
  return defaultValues
}

export const hasAnyProps = (props) => {
  return Object.entries(props).length > 0
}