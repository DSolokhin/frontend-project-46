import _ from 'lodash'
import getDataFromFile from './parsers.js'

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)))
  
  return keys.flatMap((key) => {
    if (!_.has(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] }
    }
    if (!_.has(obj1, key)) {
      return { type: 'added', key, value: obj2[key] }
    }
    
    const value1 = obj1[key]
    const value2 = obj2[key]
    
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'nested', key, children: buildDiff(value1, value2) }
    }
    
    if (!_.isEqual(value1, value2)) {
      return [
        { type: 'removed', key, value: value1 },
        { type: 'added', key, value: value2 }
      ]
    }
    
    return { type: 'unchanged', key, value: value1 }
  })
}

const formatStylish = (diff, depth = 1) => {
  const indent = '    '.repeat(depth)
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent.slice(0, -2)}+ ${node.key}: ${formatValue(node.value, depth)}`
      case 'removed':
        return `${indent.slice(0, -2)}- ${node.key}: ${formatValue(node.value, depth)}`
      case 'nested':
        return `${indent}${node.key}: ${formatStylish(node.children, depth + 1)}`
      case 'unchanged':
        return `${indent}${node.key}: ${formatValue(node.value, depth)}`
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })
  return `{\n${lines.join('\n')}\n${'    '.repeat(depth - 1)}}`
}

const formatValue = (value, depth) => {
  if (!_.isObject(value)) return value
  
  const indent = '    '.repeat(depth + 1)
  const lines = Object.entries(value).map(
    ([k, v]) => `${indent}${k}: ${formatValue(v, depth + 1)}`
  )
  return `{\n${lines.join('\n')}\n${'    '.repeat(depth)}}`
}

const genDiff = (filepath1, filepath2) => {
  const data1 = getDataFromFile(filepath1)
  const data2 = getDataFromFile(filepath2)
  const diff = buildDiff(data1, data2)
  return formatStylish(diff)
}

export default genDiff
