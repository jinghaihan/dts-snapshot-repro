# dts-snapshot-repro

Minimal reproduction for platform-dependent declaration output from `tsdown` and `rolldown-plugin-dts`.

The GitHub Actions workflow builds the same source on Ubuntu, Windows, and macOS, uploads each generated `dist/index.d.mts`, and prints hashes and contents for comparison. The example intentionally relies on inferred literal unions so that declaration-printing differences are visible if they occur.

## Minimal order reproduction

Run the focused TypeScript API reproduction with:

```sh
pnpm reproduce:tsc-order
```

It emits the same inferred return type after two different file orders. With the current TypeScript generator, the union members can be printed in different orders; enabling `stableTypeOrdering` makes the output deterministic.
