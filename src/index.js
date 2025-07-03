const genDiff = (filepath1, filepath2, format = 'stylish') => {
  return `Comparing ${filepath1} with ${filepath2}\nFormat: ${format}`
}

export default genDiff
