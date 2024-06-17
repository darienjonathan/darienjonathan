<template lang="pug">
Admin
  MHeader
  slot
</template>

<script lang="ts" setup>
import Admin from '~/layouts/admin.vue'
import MHeader from '~/components/molecules/admin/blog/MHeader.vue'

defineOptions({
  name: 'BlogAdminLayout',
})
</script>
