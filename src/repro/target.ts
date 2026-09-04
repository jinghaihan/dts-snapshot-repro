// The inferred union order changes depending on which source file is emitted first.
export function createTarget(useHarden: boolean) {
  return {
    variant: useHarden ? 'harden-image' : 'image',
  } as const
}
