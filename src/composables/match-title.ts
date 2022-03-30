import { IgnoreCase, SearMode } from './search-params'

export interface MatchTitleOptions {
  title: string
  keyword: string
  ignoreCase: IgnoreCase
  mode: SearMode
}

export function matchTitle({ title, keyword, ignoreCase = IgnoreCase.DISABLE, mode = SearMode.ALL }: MatchTitleOptions) {
  if (mode === SearMode.ALL) return true
  if (mode === SearMode.REGEXP) {
    const reg = /^\/(.+?)\/([gimuy]*)$/.exec(keyword)
    if (reg) {
      const [, body, mods] = reg
      const regex = new RegExp(body, !mods.includes('i') && ignoreCase ? `${mods}i` : mods)
      if (regex.test(title)) return true
    }
  }
  else {
    const t = ignoreCase === IgnoreCase.ENABLE ? title.toLowerCase() : title
    const k = ignoreCase === IgnoreCase.ENABLE ? keyword.toLowerCase() : keyword
    if (t.includes(k)) return true
  }
}
