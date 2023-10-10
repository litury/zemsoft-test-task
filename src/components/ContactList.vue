<template>
  <div class="contact-list">
    <h1>Контактная книжка</h1>
    <contact-filter @change="filterContacts" />
    <button @click="openForm">Добавить</button>

    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id">
        <contact-item :contact="contact" />
      </li>
    </ul>
  </div>
</template>

<script>
// import ContactFilter from "./ContactFilter.vue";
// import ContactItem from "./ContactItem.vue";

import { computed, ref } from "vue";
import {storeToRefs} from 'pinia';

import {useContactsStore} from "@/stores/contactsStore.ts";

export default {
  name: "ContactList",
  components: {
    ContactFilter,
    ContactItem,
  },

  setup() {
    // получаем хранилище
    const contactsStore = useContactsStore();

    // получаем из хранилища массив контактов
    const {contacts} = storeToRefs(contactsStore);


    const filter = ref("Все"); // текущий фильтр

    const filteredContacts = computed(() => {
      // вычисляемый массив отфильтрованных контактов
      if (filter.value === "Все") {
        return store.state.contacts; // возвращаем все контакты из стора
      } else {
        return store.state.contacts.filter(
            (contact) => contact.category === filter.value
        ); // возвращаем контакты по категории из стора
      }
    });

    const filterContacts = (value) => {
      // метод для изменения фильтра по событию из дочернего компонента
      filter.value = value;
    };

    const openForm = () => {
      // метод для открытия формы добавления контакта
      store.dispatch("setFormVisible", true); // вызываем экшн в сторе, который меняет состояние видимости формы
      router.push("/add"); // переходим на маршрут /add, где рендерится компонент ContactForm.vue
    };

    return {
      filter,
      filteredContacts,
      filterContacts,
      openForm,
    };
  },
};
</script>

<style lang="scss">
.contact-list {
  // здесь можно добавить стили для компонента
}
</style>
