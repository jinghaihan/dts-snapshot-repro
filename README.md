# dts-snapshot-repro

Minimal reproduction for platform-dependent declaration output from `tsdown` and `rolldown-plugin-dts`.

The GitHub Actions workflow builds the same source on Ubuntu, Windows, and macOS, uploads each generated `dist/index.d.mts`, and prints hashes and contents for comparison. The example intentionally relies on inferred literal unions so that declaration-printing differences are visible if they occur.
