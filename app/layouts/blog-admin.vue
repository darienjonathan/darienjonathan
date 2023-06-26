<template lang="pug">
Admin
  MHeader
  slot
</template>

<script lang="ts" setup>
import Admin from '~/layouts/admin.vue'
import MHeader from '~/components/molecules/admin/blog/MHeader.vue'
</script>
<script lang="ts">
export default {
  name: 'BlogAdminLayout',
  components: { Admin, MHeader },
}
</script>
