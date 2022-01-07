export function useDispatch(fn: (...args: any[]) => any) {
    if (import.meta.env.DEV) {
        fn()
    } else {
        onServerPrefetch(fn)
    }
}