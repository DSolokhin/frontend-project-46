import fs from 'fs'
import path from 'path'
import parseYaml from './yamlParser.js'

const getAbsolutePath = filepath => path.resolve(process.cwd(), filepath)

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

export default function getDataFromFile(filepath) {
  const data = readFile(filepath)
  const ext = path.extname(filepath).toLowerCase()
  if (ext === '.yml' || ext === '.yaml') {
    return parseYaml(data)
  }
  return JSON.parse(data)
}
