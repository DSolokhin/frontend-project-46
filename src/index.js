import _ from 'lodash'
import { getDataFromFile } from './parsers.js'

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))

  return keys.map((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`
    }
    if (data1[key] !== data2[key]) {
      return [`  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`].join('\n')
    }
    return `    ${key}: ${data1[key]}`
  }).join('\n')
}

const genDiff = (filepath1, filepath2) => {
  const data1 = getDataFromFile(filepath1)
  const data2 = getDataFromFile(filepath2)
  const diff = buildDiff(data1, data2)
  return `{\n${diff}\n}\n\n`
}

export default genDiff
