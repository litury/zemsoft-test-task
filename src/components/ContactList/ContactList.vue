<template>
  <div class="contacts-list">
    <header class="contacts-list__header">
      <div class="contacts-list__header-title">
        Контакт
      </div>

      <div v-if="isWideScreen768" class="contacts-list__header-title">
        Телефон
      </div>

      <div v-if="isWideScreen768" class="contacts-list__header-title">
        Email
      </div>

      <div v-if="!isWideScreen768" class="contacts-list__header-title">
        Телефон / Email
      </div>

      <div class="contacts-list__header-title contacts-list__header-title--right">
        Создан
      </div>
    </header>


    <section v-for="contact in filteredContacts(true)">
      <main class="contacts-list__users" @click="getContacts(contact.id)">


        <div class="contacts-list__content contacts-list__content-name">

          <div v-if="isWideScreen576" class="contact-avatar">
            {{ contact.name[0] }}
          </div>

          {{ contact.name }}
        </div>

        <div class="contacts-list__content">
          <p>{{ contact.phone }}</p>
          <p v-if="!isWideScreen768">{{ contact.email }}</p>
        </div>

        <div v-if="isWideScreen768" class="contacts-list__content">
          <p>{{ contact.email }}</p>
        </div>

        <div class="contacts-list__content contacts-list__content--right">
          {{ formatDate(contact.date) }}
        </div>
      </main>

    </section>
  </div>

</template>

<script setup lang="ts">
import Loader from "@/components/Loader.vue";

import {useContactsStore} from "@/stores/contactsStore";
import {storeToRefs} from 'pinia'
import {ref} from "vue";

import dayjs from 'dayjs'

import {useRouter, useRoute} from 'vue-router'
import {onBeforeMount, onMounted} from "vue";

const contactsStore = useContactsStore()
const {filteredContacts} = storeToRefs(contactsStore)

const router = useRouter()
const route = useRoute()

let isWideScreen576 = ref(false)
let isWideScreen768 = ref(false)

const resize = () => {
  isWideScreen576 = window.innerWidth >= 576
}

function formatDate(dateString) {
  console.log(dateString)

  const date = dayjs(dateString);

  return date.format('DD.MM.YY');
}

console.log(`Размер по умолчанию ${isWideScreen576.value}`)

function getContacts(id) {
  router.push({name: 'contact', params: {id}})
}

function handleResize() {
  console.log(`Размер функции ${isWideScreen576.value}`)


  if (window.innerWidth >= 575) {
    isWideScreen576.value = true
  } else {
    isWideScreen576.value = false
  }

  if (window.innerWidth >= 768) {
    isWideScreen768.value = true
  } else {
    isWideScreen768.value = false
  }
}

onMounted(() => {
  handleResize()

  window.addEventListener('resize', handleResize)
})

onBeforeMount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style>

.contacts-list {
  padding: 16px;
}

@media (min-width: 1200px) {
  .contacts-list  {
    width: 990px;
    margin: 0 auto;
  }
}

.contacts-list__users {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  text-align: left;
  border-bottom: 1px solid #EAF2FD;
}

@media (min-width: 768px) {
  .contacts-list__users {
    grid-template-columns: 2fr 2fr 2fr 1fr;
  }
}


.contacts-list__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 48px;

  color: #545454;
  font-family: Proxima Nova Regular, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 112%; /* 13.44px */
}

@media (min-width: 576px) {

  .contacts-list__content-name {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
  }
}

.contact-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 56px;
  background: #FFC700;

  color: #545454;
  text-align: center;
  font-family: Proxima Nova Bold, sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.contacts-list__content--right {
  text-align: right;
  font-size: 10px;
}

.contacts-list__header {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  text-align: left;
}

@media (min-width: 768px) {
  .contacts-list__header {
    grid-template-columns: 2fr 2fr 2fr 1fr;
  }
}

.contacts-list__header-title {
  color: #B5B5B5;

  font-family: Proxima Nova Regular, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 160% */

  text-transform: uppercase;
}

.contacts-list__header-title--right {
  text-align: right;
}


</style>