import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { test, expect } from '@jest/globals'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename)
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8')

// Тесты для плоских структур
describe('flat files', () => {
  test('JSON diff', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const result = genDiff(file1, file2)
    const expected = readFixture('expectedFlat.txt')
    expect(result.replace(/\s+$/, '')).toBe(expected.replace(/\s+$/, ''))
  })
})

// Тесты для вложенных структур
describe('nested files', () => {
  test('JSON diff', () => {
    const file1 = getFixturePath('nested1.json')
    const file2 = getFixturePath('nested2.json')
    const result = genDiff(file1, file2)
    const expected = readFixture('expectedNested.txt')
    expect(result.replace(/\s+$/, '')).toBe(expected.replace(/\s+$/, ''))
  })

  test('YAML diff', () => {
    const file1 = getFixturePath('nested1.yml')
    const file2 = getFixturePath('nested2.yml')
    const result = genDiff(file1, file2)
    const expected = readFixture('expectedNested.txt')
    expect(result.replace(/\s+$/, '')).toBe(expected.replace(/\s+$/, ''))
  })
})