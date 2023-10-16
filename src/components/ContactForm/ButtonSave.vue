<script setup lang="ts">
import ButtonSave from "@/components/icons/ButtonSave.vue";
import ButtonSaveLoader from "@/components/icons/ButtonSaveLoader.vue";

import {useContactsStore} from "@/stores/contactsStore";
import {computed} from "vue";

const contactsStore = useContactsStore()

const isLoading = computed(() => contactsStore.isLoader)


</script>

<template>
  <button
      class="contact-form__button"
      type="submit">

    <component :is="isLoading ? ButtonSaveLoader : ButtonSave" :key="isLoading"/>

    СОХРАНИТЬ
  </button>

</template>

<style scoped>
.contact-form__button {
  display: flex;
  width: 124px;

  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 4px;
  background: #FFC700;

  color: #545454;
  text-align: center;
  font-family: Proxima Nova Bold, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 14.4px */
}

</style>