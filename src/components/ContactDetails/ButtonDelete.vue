<script setup lang="ts">
import CarIcon from "@/components/icons/CarIcon.vue";

import {ref} from "vue";
import {useContactsStore} from "@/stores/contactsStore";

const contactsStore = useContactsStore()

const deleteContact = () => {
  contactsStore.deleteContact()
}

</script>

<template>
<button class="button-delete" type="button">
  <CarIcon/>
  Удалить контакт
</button>
</template>

<style scoped>
.button-delete {
  color: #2F80ED;
  text-align: right;
  /* Body/Body 5 Regular */
  font-family: Proxima Nova Regular, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
}

</style>