<template lang="pug">
.markdown
  h1.title Markdown
  .textarea-to-markdown
    .section
      label.label textarea
      textarea.content(@input="handleTextareaInput")
    .line
    .section
      label.label markdown output
      .content(v-html="markdownHTML")
  button.save-btn(@click="handleSave") Save
</template>
<script lang="ts" setup>
const { $md } = useNuxtApp()
const { usePosts } = useStorageItems()
const posts = usePosts()

const val = ref('')
const markdownHTML = computed(() => {
  return $md.render(val.value)
})
const handleTextareaInput = (e: Event) => {
  val.value = (e.target as HTMLTextAreaElement).value
}

const handleSave = async () => {
  await posts.putString({
    file: val.value,
    fileName: 'test.md',
  })
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/main';

.markdown {
  @include size(vw(100), vh(100));
  @include flex($direction: column);
  background-color: $navy-dark;
}

.title {
  @include font-family('roboto-slab');
  @include font($size: 2rem);
  margin-bottom: 32px;
}

.textarea-to-markdown {
  @include sp {
    @include flex($direction: column);
  }
  @include non-sp {
    @include flex;
  }
}

.section {
  @include sp {
    &:first-child {
      margin-bottom: 16px;
    }
    &:last-child {
      margin-top: 16px;
    }
  }
  @include non-sp {
    &:first-child {
      margin-right: 16px;
    }
    &:last-child {
      margin-left: 16px;
    }
  }
}

.label {
  @include size(fit-content);
  display: block;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid $white;
}

.content {
  @include size(300px, 200px);
  padding: 8px;
}

.line {
  @include sp {
    @include line(y, 100%, 1px);
  }
  @include non-sp {
    @include line(x, 100%, 1px);
  }
}

.markdown-output {
  @include sp {
    margin-top: 16px;
  }
  @include non-sp {
    margin-left: 16px;
  }
}
</style>
