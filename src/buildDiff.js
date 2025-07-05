const isObject = (value) => typeof value === 'object' && value !== null

const buildDiff = (data1, data2) => {
  const keys = new Set([...Object.keys(data1), ...Object.keys(data2)])
  return Array.from(keys).sort().map((key) => {
    if (!(key in data2)) {
      return { key, type: 'removed', value: data1[key] }
    }
    if (!(key in data1)) {
      return { key, type: 'added', value: data2[key] }
    }
    if (isObject(data1[key]) && isObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: buildDiff(data1[key], data2[key]),
      }
    }
    if (data1[key] !== data2[key]) {
      return {
        key,
        type: 'updated',
        value1: data1[key],
        value2: data2[key],
      }
    }
    return { key, type: 'unchanged', value: data1[key] }
  })
}

export default buildDiff
