<script setup lang="ts">
import { IgnoreCase, PostType, SearMode, getSearchParams } from '~/composables'
const router = useRouter()
router.push({
  path: getSearchParams({
    keyword: '',
    mode: SearMode.ALL,
    ignoreCase: IgnoreCase.DISABLE,
    type: PostType.POST,
  }),
})
</script>
