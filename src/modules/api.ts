import type { UserModule } from '~/types'

// Setup Pinia
export const install: UserModule = ({ router, initialState }) => {
  router.beforeEach((to, from, next) => {
    const request = Object.entries(import.meta.globEager('../service/*.ts')).find((i) => {
      return i[0].substring('../service'.length, i[0].length - 3) === to.fullPath
    })
    if (request) {
      const { dispatch } = request[1].useStore()
      dispatch().then((res: any) => {
        initialState = { ...initialState, [to.fullPath]: res }
        next()
      })
    }
    else {
      next()
    }
  })
}
