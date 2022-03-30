<script setup lang="ts">
import { IgnoreCase, SearMode } from '~/composables'

const router = useRouter()
router.push({ path: `/posts/${encodeURIComponent(`${SearMode.ALL}!${IgnoreCase.DISABLE}!`)}` })
</script>
