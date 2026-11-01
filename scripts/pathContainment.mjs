import path from 'node:path'

export function isWithinDirectory(directory, target) {
  const relative = path.relative(path.resolve(directory), path.resolve(target))
  return (
    relative === '' ||
    (relative !== '..' &&
      !relative.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(relative))
  )
}
