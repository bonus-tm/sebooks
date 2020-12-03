<template>
  <div class="flex">
    <!-- Mark and Read -->
    <div class="px-4">
      <div
        class="mt-1 mb-10 text-center w-24 p-2 cursor-pointer rounded hover:bg-yellow-50"
        @click="$emit('toggle', 'read')"
      >
        <a :href="book.url" target="_blank" class="text-black no-underline">
          <img alt="" class="w-14 mx-auto" src="/sebooks-logo-black-full.svg">
          <div class="text-sm">
            Get book
          </div>
        </a>
      </div>

      <div
        class="text-center w-24 mb-2 p-2 cursor-pointer rounded hover:bg-yellow-50"
        @click="$emit('toggle', 'marked')"
      >
        <icon-star :filled="userData.marked" class="mx-auto w-8 h-8" />
        <div class="text-sm">
          {{ userData.marked ? 'Marked' : 'Unmarked' }}
        </div>
      </div>
      <div
        class="text-center w-24 p-2 cursor-pointer rounded hover:bg-yellow-50"
        @click="$emit('toggle', 'read')"
      >
        <icon-read :filled="userData.read" class="mx-auto w-8 h-8" />
        <div class="text-sm">
          {{ userData.read ? 'Read' : 'Unread' }}
        </div>
      </div>
    </div>

    <!-- Book Info -->
    <div class="px-2 flex-grow">
      <h3 class="text-xl text-yellow-800">
        <span :title="book.authorFullName">{{ book.creator }}</span>
      </h3>
      <h1 class="mb-4 font-bold text-5xl text-yellow-800 opacity-80">
        {{ book.title }}
      </h1>

      <div class="flex justify-start space-x-1 text-sm mb-2">
        <div
          v-for="(tag, i) in book.tags"
          :key="`tag-${i}`"
          class="rounded px-1 bg-yellow-600 text-white font-bold"
        >
          {{ tag }}
        </div>
      </div>
      <div class="">
        {{ Number(book.wordsCount).toLocaleString() }}
        words
      </div>
      <div class="mb-4">
        {{ Math.round(book.readingEase) }}
        {{ readingEaseDescription }}
      </div>
      <div class="text-purple-800">
        <div
          v-for="(subject, i) in book.subject"
          :key="`subject-${i}`"
        >
          {{ subject.replace(/--/g, '—') }}
        </div>
      </div>

      <div class="mt-16 max-w-2xl description" v-html="book.description" />
    </div>

    <!-- Book cover -->
    <div class="w-1/3 flex-shrink-0 pl-2">
      <div class="shadow-lg">
        <img :src="`/covers/${book.id}.jpg`" alt="" class="object-contain object-left-top">
      </div>
    </div>
  </div>
</template>

<script>
import IconStar from '@/components/IconStar'
import IconRead from '@/components/IconRead'

export default {
  name: 'BookItem',
  components: {IconRead, IconStar},
  props: {
    book: {type: Object, required: true},
    userData: {
      type: Object,
      default () {
        return {marked: false, read: false}
      }
    }
  },
  computed: {
    readingEaseDescription () {
      let value = this.book.readingEase
      if (!value) return ''
      if (value >= 90) return 'very easy'
      if (value >= 79) return 'easy'
      if (value >= 69) return 'fairly easy'
      if (value >= 59) return 'average difficulty'
      if (value >= 49) return 'fairly difficult'
      if (value >= 39) return 'difficult'
      return 'very difficult'
    }
  }
}
</script>
