import fs from 'fs'
import path from 'path'

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath)

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const parseData = (data) => JSON.parse(data)

export default function getDataFromFile(filepath) {
  const data = readFile(filepath)
  return parseData(data)
}
