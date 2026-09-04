import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { tscEmit } from 'rolldown-plugin-dts/tsc'
import { createContext } from 'rolldown-plugin-dts/tsc-context'

const root = path.resolve(import.meta.dirname, '..')
const tsconfigPath = path.join(root, 'tsconfig.json')
const tsconfigRaw = JSON.parse(await readFile(tsconfigPath, 'utf8'))
const seed = path.join(root, 'src/repro/seed.ts')
const target = path.join(root, 'src/repro/target.ts')

const languageContext = {
  languages: [],
  getExtraFileExtensions: () => [],
  getCreateProgram: (ts) => ts.createProgram,
  isCustomLanguageFile: () => false,
}

function emitTarget(first, stableTypeOrdering = false) {
  const context = createContext()
  const compilerOptions = stableTypeOrdering
    ? {
        ...tsconfigRaw.compilerOptions,
        stableTypeOrdering: true,
      }
    : tsconfigRaw.compilerOptions
  const options = {
    tsconfig: tsconfigPath,
    tsconfigRaw: { ...tsconfigRaw, compilerOptions },
    cwd: root,
    build: false,
    incremental: false,
    sourcemap: false,
    entries: [seed, target],
    languageContext,
    context,
  }

  for (const id of first) tscEmit({ ...options, id })
  return tscEmit({ ...options, id: target }).code.match(
    /readonly variant: [^;]+;/,
  )?.[0]
}

const targetFirst = emitTarget([target])
const seedFirst = emitTarget([seed])
const stableTargetFirst = emitTarget([target], true)
const stableSeedFirst = emitTarget([seed], true)

console.log('target.ts emitted first:', targetFirst)
console.log('seed.ts emitted first:', seedFirst)
console.log('target.ts emitted first with stableTypeOrdering:', stableTargetFirst)
console.log('seed.ts emitted first with stableTypeOrdering:', stableSeedFirst)
console.log(
  targetFirst === seedFirst
    ? 'No order difference observed.'
    : 'Order-dependent declaration output observed.',
)
console.log(
  stableTargetFirst === stableSeedFirst
    ? 'stableTypeOrdering removes the order difference.'
    : 'stableTypeOrdering did not remove the order difference.',
)
