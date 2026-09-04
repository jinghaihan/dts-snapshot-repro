// This file intentionally interns the same literal types used by target.ts.
export type SharedVariant = 'image' | 'harden-image'

export interface SeedOptions {
  variant?: SharedVariant | 'vanilla'
}

export function seedVariant(options: SeedOptions = {}) {
  const variant = options.variant ?? 'vanilla'
  return {
    variant,
    isHarden: variant.startsWith('harden-'),
  }
}
