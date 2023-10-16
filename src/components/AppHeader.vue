<template>
  <header class="contact-add">
    <div v-if="wrapContent" class="contact-add__content">
      <slot name="logo"/>
      <slot name="title"/>
      <slot name="close"/>
    </div>

    <template v-else>
      <slot name="logo"/>
      <slot name="title"/>
      <slot name="close"/>
    </template>
  </header>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";

const props = defineProps({
  wrapContent: {
    type: Boolean,
    default: false,
  },
});


</script>

<style scoped>


.contact-add {
  display: flex;
  position: relative;
  padding-right: 12px;
  padding-left: 12px;
  align-items: center;
  background-color: #282828;
  min-height: 40px;
}

@media (min-width: 1200px) {
  .contact-add {
    padding-right: 48px;
    padding-left: 48px;
    gap: 30px;
  }
}

.contact-add__content {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
}


</style>