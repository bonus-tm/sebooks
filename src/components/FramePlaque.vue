<script setup>
const props = defineProps({
  tag: {type: String, required: true},
})
</script>

<template>
  <div class="plaque">
    <p class="text-white dark:text-yellow-100 font-bold mb-0 px-2">
      {{ tag }}
    </p>
  </div>
</template>

<style scoped>
.plaque {
  --plaque-edge-width: 0.5rem;
  --plaque-height: 1.875rem;

  padding: 0 var(--plaque-edge-width);
  background-clip: border-box, content-box, border-box;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 59'%3E%3Cpath fill='%23CA8A04' d='M16 0H.8C.3 0 0 .3 0 .8v57.4c0 .5.4.8.8.8H16v-1.5H1.5v-56H16V0Z'/%3E%3Cpath fill='%23CA8A04' d='M16 5h-.78c-.5 0-.8.4-.8.79a8.6 8.6 0 0 1-8.61 8.59c-.5 0-.8.4-.8.8v28.05c0 .5.4.8.8.8 4.8 0 8.6 3.89 8.6 8.58 0 .5.4.8.8.8H16V4.99Z'/%3E%3Cpath fill='%23CA8A04' fill-rule='evenodd' d='M7.3 10.58c-1.8 0-3.3-1.5-3.3-3.3C4 5.5 5.5 4 7.3 4c1.8 0 3.31 1.5 3.31 3.3 0 1.8-1.5 3.3-3.3 3.3Zm0-5.09c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8ZM4 51.21c0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.31-1.5 3.31-3.3 0-1.8-1.5-3.3-3.3-3.3-1.8 0-3.3 1.5-3.3 3.3Zm1.5 0c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8Z' clip-rule='evenodd'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 59'%3E%3Cpath fill='%23CA8A04' d='M16 0H0v1.5h16V0ZM16 57.5V59H0v-1.5h16ZM16 5V53.4H0V4.99h16Z'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 59'%3E%3Cpath fill='%23CA8A04' d='M0 59h15.2c.5 0 .8-.4.8-.7V.8c0-.5-.4-.8-.8-.8H0v1.5h14.5v56H0V59Z'/%3E%3Cpath fill='%23CA8A04' d='M0 53.41h.98c.4 0 .7-.3.8-.6a8.6 8.6 0 0 1 8.61-8.59c.5 0 .8-.4.8-.8V15.18c0-.5-.4-.8-.8-.8A8.6 8.6 0 0 1 1.8 5.8c0-.5-.4-.8-.8-.8H0v48.42Z'/%3E%3Cpath fill='%23CA8A04' fill-rule='evenodd' d='M8.5 10.58c-1.81 0-3.31-1.5-3.31-3.3C5.19 5.5 6.69 4 8.49 4c1.8 0 3.3 1.5 3.3 3.3 0 1.8-1.5 3.3-3.3 3.3Zm0-5.09c-1 0-1.81.8-1.81 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8ZM5.19 51.21c0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.3-1.5 3.3-3.3 0-1.8-1.5-3.3-3.3-3.3-1.8 0-3.3 1.5-3.3 3.3Zm1.5 0c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8Z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-position: left, center, right;
  background-repeat: no-repeat, repeat-x, no-repeat;
  background-size:
    var(--plaque-edge-width) auto,
    var(--plaque-edge-width) auto,
    var(--plaque-edge-width) auto;
}
@media (prefers-color-scheme: dark) {
  .plaque {
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 59'%3E%3Cpath fill='%23854D0E' d='M16 0H.8C.3 0 0 .3 0 .8v57.4c0 .5.4.8.8.8H16v-1.5H1.5v-56H16V0Z'/%3E%3Cpath fill='%23854D0E' d='M16 5h-.78c-.5 0-.8.4-.8.79a8.6 8.6 0 0 1-8.61 8.59c-.5 0-.8.4-.8.8v28.05c0 .5.4.8.8.8 4.8 0 8.6 3.89 8.6 8.58 0 .5.4.8.8.8H16V4.99Z'/%3E%3Cpath fill='%23854D0E' fill-rule='evenodd' d='M7.3 10.58c-1.8 0-3.3-1.5-3.3-3.3C4 5.5 5.5 4 7.3 4c1.8 0 3.31 1.5 3.31 3.3 0 1.8-1.5 3.3-3.3 3.3Zm0-5.09c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8ZM4 51.21c0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.31-1.5 3.31-3.3 0-1.8-1.5-3.3-3.3-3.3-1.8 0-3.3 1.5-3.3 3.3Zm1.5 0c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8Z' clip-rule='evenodd'/%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 59'%3E%3Cpath fill='%23854D0E' d='M16 0H0v1.5h16V0ZM16 57.5V59H0v-1.5h16ZM16 5V53.4H0V4.99h16Z'/%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 59'%3E%3Cpath fill='%23854D0E' d='M0 59h15.2c.5 0 .8-.4.8-.7V.8c0-.5-.4-.8-.8-.8H0v1.5h14.5v56H0V59Z'/%3E%3Cpath fill='%23854D0E' d='M0 53.41h.98c.4 0 .7-.3.8-.6a8.6 8.6 0 0 1 8.61-8.59c.5 0 .8-.4.8-.8V15.18c0-.5-.4-.8-.8-.8A8.6 8.6 0 0 1 1.8 5.8c0-.5-.4-.8-.8-.8H0v48.42Z'/%3E%3Cpath fill='%23854D0E' fill-rule='evenodd' d='M8.5 10.58c-1.81 0-3.31-1.5-3.31-3.3C5.19 5.5 6.69 4 8.49 4c1.8 0 3.3 1.5 3.3 3.3 0 1.8-1.5 3.3-3.3 3.3Zm0-5.09c-1 0-1.81.8-1.81 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8ZM5.19 51.21c0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.3-1.5 3.3-3.3 0-1.8-1.5-3.3-3.3-3.3-1.8 0-3.3 1.5-3.3 3.3Zm1.5 0c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8Z' clip-rule='evenodd'/%3E%3C/svg%3E");
  }
}
.plaque > p {
  height: var(--plaque-height);
  line-height: 1.75rem;
}
</style>
