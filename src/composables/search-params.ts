import type { MatchTitleOptions } from '.'

export enum SearMode {
  ALL = '0',
  KEYWORD='1',
  REGEXP='2',
}
export enum IgnoreCase {
  DISABLE='0',
  ENABLE='1',
}

export function useSearchParams(searchString: string): Omit<MatchTitleOptions, 'title'> {
  const split = decodeURIComponent(searchString).split('!')
  const mode = split.length < 3 ? SearMode.ALL : split[0] as unknown as SearMode
  const ignoreCase = split[1] as unknown as IgnoreCase
  const express = split.length > 3 ? split.slice(2).join('!') : split[2]
  return {
    keyword: express,
    ignoreCase,
    mode,
  }
}
