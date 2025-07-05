import stylish from './stylish.js'
import plain from './plain.js'

const formatters = {
  stylish,
  plain
}

export default (formatName) => {
  const formatter = formatters[formatName]
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatter
}
