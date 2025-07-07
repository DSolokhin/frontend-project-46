import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename)

test('plain formatter works correctly', () => {
  const filepath1 = getFixturePath('filepath1.json')
  const filepath2 = getFixturePath('filepath2.json')
  const expected = readFileSync(getFixturePath('plain_result.txt'), 'utf-8').trim()
  const result = genDiff(filepath1, filepath2, 'plain').trim()
  expect(result).toBe(expected)
})
