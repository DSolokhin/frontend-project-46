import getDataFromFile from './parsers.js'
import stylish from './formatters/stylish.js'
import buildDiff from './buildDiff.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getDataFromFile(filepath1)
  const data2 = getDataFromFile(filepath2)
  const diff = buildDiff(data1, data2)
  
  switch (format) {
    case 'stylish':
      return stylish(diff)
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}

export default genDiff
