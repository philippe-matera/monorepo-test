// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const buildTranslationKeys = (keyOrKeys: string | string[], suffixes: string[]) => {
  if (suffixes.length) {
    const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys]
    let all_suffixes = suffixes
    if (suffixes.length > 1) {
      all_suffixes = [suffixes.join("_"), ...suffixes]
    }
    return [...keys.flatMap(key => all_suffixes.map(suffix => `${key}_${suffix}`)), ...keys]
  }
  return keyOrKeys
}
