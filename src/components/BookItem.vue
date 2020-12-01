<template>
  <div class="flex mb-10 mx-2">
    <div class="px-2 flex-grow">
      <h1 class="font-bold">
        <a :href="book.url">{{ book.title }}</a>
      </h1>
      <h3 class="mb-2">
        <span :title="book.authorFullName">{{ book.creator }}</span>
      </h3>
      <div class="flex justify-start space-x-1 text-xs mb-2">
        <div
          v-for="(tag, i) in book.tags"
          :key="`tag-${i}`"
          class="rounded-sm px-1 bg-yellow-600 text-white font-bold"
        >
          {{ tag }}
        </div>
      </div>
      <div class="text-sm">
        {{ book.wordsCount }}
        words
      </div>
      <div class="text-sm mb-4">
        {{ book.readingEase }}
        {{ readingEaseDescription }}
      </div>
      <div class="text-sm mb-4">
        <div
          v-for="(subject, i) in book.subject"
          :key="`subject-${i}`"
        >
          {{ subject.replace(/--/g, '—') }}
        </div>
      </div>

      <div class="flex">
        <div
          class="text-center w-20 mr-2 p-2 cursor-pointer rounded hover:bg-yellow-50"
          @click="$emit('toggle', 'marked')"
        >
          <icon-star :filled="userData.marked" class="mx-auto w-8 h-8" />
          <div class="text-sm">
            {{ userData.marked ? 'Marked' : 'Unmarked' }}
          </div>
        </div>
        <div
          class="text-center w-20 p-2 cursor-pointer rounded hover:bg-yellow-50"
          @click="$emit('toggle', 'read')"
        >
          <icon-read :filled="userData.read" class="mx-auto w-8 h-8" />
          <div class="text-sm">
            {{ userData.read ? 'Read' : 'Unread' }}
          </div>
        </div>
      </div>
    </div>

    <div class="px-2 w-1/3 flex-shrink-0">
      <div class="text-sm description" v-html="book.description" />
    </div>

    <div class="max-h-96 w-72 flex-shrink-0 px-2">
      <img :src="`/covers/${book.id}.jpg`" alt="" class="h-96 object-contain object-left-top">
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
