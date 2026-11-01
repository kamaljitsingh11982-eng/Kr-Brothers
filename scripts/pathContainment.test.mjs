import assert from 'node:assert/strict'
import path from 'node:path'
import test from 'node:test'
import { isWithinDirectory } from './pathContainment.mjs'

test('allows the directory itself and descendants', () => {
  const root = path.resolve('dist')

  assert.equal(isWithinDirectory(root, root), true)
  assert.equal(isWithinDirectory(root, path.join(root, 'assets', 'app.js')), true)
})

test('rejects parent traversal and sibling paths sharing the root prefix', () => {
  const root = path.resolve('dist')

  assert.equal(isWithinDirectory(root, path.resolve(root, '..', 'private.txt')), false)
  assert.equal(
    isWithinDirectory(root, path.resolve(root, '..', 'dist-archive', 'private.txt')),
    false,
  )

  const decodedPath = decodeURIComponent('/%2e%2e/dist-archive/private.txt')
  assert.equal(isWithinDirectory(root, path.resolve(root, `.${decodedPath}`)), false)
})
