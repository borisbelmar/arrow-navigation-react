export type ElementByDirection = {
  [key: string]: string | null
}

export type FocusableElementOptions = {
  nextElementByDirection?: ElementByDirection
  onFocus?: () => void
  onBlur?: () => void
}

export type FocusableGroupOptions = {
  firstElement?: string
  nextGroupByDirection?: ElementByDirection
  saveLast?: boolean
  viewportSafe?: boolean
  threshold?: number
  onFocus?: () => void
  onBlur?: () => void
  keepFocus?: boolean
}
