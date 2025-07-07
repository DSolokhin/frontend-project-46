import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { test, expect } from '@jest/globals'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)
const readFixture = filename => readFileSync(getFixturePath(filename), 'utf-8')

test('flat YAML diff', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = readFixture('expected_result.txt').replace(/\s+$/, '')
  expect(genDiff(file1, file2).replace(/\s+$/, '')).toBe(expected)
})
