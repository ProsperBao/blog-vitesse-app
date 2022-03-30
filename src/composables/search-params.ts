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
export enum PostType {
  POST='post',
  LEARN='learn'
}

export function useSearchParams(searchString: string): Omit<MatchTitleOptions, 'title'> {
  const split = decodeURIComponent(searchString).split('!')
  const mode = split.length < 4 ? SearMode.ALL : split[0] as unknown as SearMode
  const ignoreCase = split[1] as unknown as IgnoreCase
  const type = split[2] as unknown as PostType || PostType.POST
  const express = split.length > 4 ? split.slice(3).join('!') : split[3]
  return {
    keyword: express,
    ignoreCase,
    mode,
    type,
  }
}

export function getSearchParams(params: Omit<MatchTitleOptions, 'title'>): string {
  const { keyword, ignoreCase, mode, type } = params
  const url = decodeURIComponent(`${mode}!${ignoreCase}!${type}!${keyword}`)
  return `/posts/${url}`
}
