const formatValue = (value) => {
    if (value === null) return 'null'
    if (typeof value === 'object') return '[complex value]'
    return typeof value === 'string' ? `'${value}'` : String(value)
  }
  
  const formatPlain = (diff, parentPath = '') => {
    const lines = diff
      .sort((a, b) => a.key.localeCompare(b.key))
      .flatMap((node) => {
        const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key
  
        switch (node.type) {
          case 'added':
            return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`
          case 'removed':
            return `Property '${currentPath}' was removed`
          case 'updated':
            return `Property '${currentPath}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`
          case 'nested':
            return formatPlain(node.children, currentPath)
          case 'unchanged':
            return []
          default:
            throw new Error(`Unknown node type: ${node.type}`)
        }
      })
  
    return lines.join('\n')
  }
  
  export default formatPlain
  