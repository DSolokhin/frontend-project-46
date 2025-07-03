import { getDataFromFile } from './parsers.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getDataFromFile(filepath1)
  const data2 = getDataFromFile(filepath2)

  // Пока просто возвращаем объекты для проверки
  return `Data from ${filepath1}:\n${JSON.stringify(data1, null, 2)}\n\nData from ${filepath2}:\n${JSON.stringify(data2, null, 2)}`
}

export default genDiff
