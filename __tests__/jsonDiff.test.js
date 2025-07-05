import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename)

test('json formatter works correctly', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const result = genDiff(filepath1, filepath2, 'json')
  const parsed = JSON.parse(result) // Проверяем что вывод валидный JSON
  expect(parsed).toBeInstanceOf(Array)
})

