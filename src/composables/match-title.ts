export interface MatchTitleOptions {
  title: string
  keyword: string
  isRegExp?: boolean
  ignoreCase?: boolean
}

export function matchTitle({ title, keyword, ignoreCase, isRegExp = false }: MatchTitleOptions) {
  if (isRegExp) {
    const reg = /^\/(.+?)\/([gimuy]*)$/.exec(keyword)
    if (reg) {
      const [, body, mods] = reg
      const regex = new RegExp(body, !mods.includes('i') && ignoreCase ? `${mods}i` : mods)
      if (regex.test(title)) return true
    }
  }
  else {
    const t = ignoreCase ? title.toLowerCase() : title
    const k = ignoreCase ? keyword.toLowerCase() : keyword
    if (t.includes(k)) return true
  }
}
