const formatValue = (value, depth) => {
    if (!_.isObject(value)) return value
    
    const indent = '    '.repeat(depth + 1)
    const lines = Object.entries(value).map(
      ([k, v]) => `${indent}${k}: ${formatValue(v, depth + 1)}`
    )
    return `{\n${lines.join('\n')}\n${'    '.repeat(depth)}}`
  }
  
  const stylish = (diff, depth = 1) => {
    const indent = '    '.repeat(depth)
    const lines = diff.map((node) => {
      switch (node.type) {
        case 'added':
          return `${indent.slice(0, -2)}+ ${node.key}: ${formatValue(node.value, depth)}`
        case 'removed':
          return `${indent.slice(0, -2)}- ${node.key}: ${formatValue(node.value, depth)}`
        case 'changed':
          return [
            `${indent.slice(0, -2)}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
            `${indent.slice(0, -2)}+ ${node.key}: ${formatValue(node.newValue, depth)}`
          ].join('\n')
        case 'nested':
          return `${indent}${node.key}: ${stylish(node.children, depth + 1)}`
        case 'unchanged':
          return `${indent}${node.key}: ${formatValue(node.value, depth)}`
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })
    
    return `{\n${lines.join('\n')}\n${'    '.repeat(depth - 1)}}`
  }
  
  export default stylish