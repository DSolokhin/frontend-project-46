const formatValue = (value, depth) => {
    if (value === null) return 'null'
    if (typeof value !== 'object') return String(value)
  
    const indent = ' '.repeat((depth + 1) * 4)
    const lines = Object.entries(value)
      .map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`)
  
    return `{\n${lines.join('\n')}\n${' '.repeat(depth * 4)}}`
  }
  
  const stylish = (diff, depth = 0) => {
    const indent = ' '.repeat(depth * 4 + 2)
    const lines = diff.flatMap((node) => {
      switch (node.type) {
        case 'added':
          return `${indent}+ ${node.key}: ${formatValue(node.value, depth + 1)}`
        case 'removed':
          return `${indent}- ${node.key}: ${formatValue(node.value, depth + 1)}`
        case 'updated':
          return [
            `${indent}- ${node.key}: ${formatValue(node.value1, depth + 1)}`,
            `${indent}+ ${node.key}: ${formatValue(node.value2, depth + 1)}`
          ]
        case 'unchanged':
          return `${indent}  ${node.key}: ${formatValue(node.value, depth + 1)}`
        case 'nested':
          return `${indent}  ${node.key}: ${stylish(node.children, depth + 1)}`
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })
  
    return depth === 0
      ? `{\n${lines.join('\n')}\n}`
      : `{\n${lines.join('\n')}\n${' '.repeat(depth * 4)}}`
  }
  
  export default stylish
  