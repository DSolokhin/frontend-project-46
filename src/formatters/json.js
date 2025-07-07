const formatJson = (diff) => {
  const buildJsonDiff = nodes => nodes.map((node) => {
    const baseNode = {
      key: node.key,
      type: node.type,
    }

    switch (node.type) {
      case 'added':
        return { ...baseNode, value: node.value }
      case 'removed':
        return { ...baseNode, value: node.value }
      case 'updated':
        return {
          ...baseNode,
          oldValue: node.value1,
          newValue: node.value2,
        }
      case 'nested':
        return { ...baseNode, children: buildJsonDiff(node.children) }
      case 'unchanged':
        return { ...baseNode, value: node.value }
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return JSON.stringify(buildJsonDiff(diff), null, 2)
}

export default formatJson
