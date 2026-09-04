export interface ImageOptions<TComponent = unknown> {
  isHardenUrl?: boolean
  imageLoaded?: boolean
  component?: TComponent
}

export interface ImageModelOptions<TComponent = unknown> {
  imageOptions?: ImageOptions<TComponent>
  imageLoaded?: boolean
  isHardenUrl?: boolean
  loadError?: boolean
}

export function createImageModel<TComponent = unknown>(options: ImageModelOptions<TComponent>) {
  const isLoading = !options.imageLoaded

  return {
    isLoading,
    fallback: options.imageOptions?.component ?? '',
    figureWidth: isLoading ? '100%' : 'auto',
    errorVariant: options.isHardenUrl ? 'harden-image' : 'image',
  } as const
}
