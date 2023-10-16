<template>

  <!-- Обертка компонента -->
  <div class="custom-select"
       tabindex="0"
       @blur="open = false"
  >

    <!-- Выбранный элемент -->
    <div class="selected"
         :class="{ open: open }"
         @click="open = !open"
    >
         <span>
        {{ selected }}
      </span>
    </div>

    <!-- Список элементов -->
    <div class="items"
         :class="{ selectHide: !open }"
    >

      <!-- Элемент списка -->
      <div class="test"
           v-for="(option, i) of filterCategories"
           :key="i"
           @click="
          selected = option;
          open = false;
          $emit('input', option);
          contactsStore.selectCategory(option);
        "
      >
        <span>{{ option }}</span>

        <!-- Иконка выбранного элемента -->
        <ArrovCheck
            v-if="selected === option"
            class="custom-select__icon"
        />
      </div>
    </div>
  </div>
</template>


<script setup>


// Импорты
import {ref, onMounted} from 'vue'
import ArrovCheck from "@/components/icons/ArrovCheck.vue";

import {useContactsStore} from "@/stores/contactsStore";
import {storeToRefs} from 'pinia'

const contactsStore = useContactsStore()

// Доступ к данным хранилища
const {categories} = storeToRefs(contactsStore)

const filterCategories = ['Все', ...categories.value];

// Рефы компонента
let selected = ref(contactsStore.selectedCategory);

let open = ref(false);

const emit = defineEmits(['input']);

onMounted(() => {

  emit('input', selected.value);
});

</script>


<style scoped>

/* Элемент .custom-select */
.custom-select {
  width: 222px;
  position: relative;
  text-align: left;
  outline: none;
  line-height: 20px;
}

/* Дочерний .selected */
.custom-select .selected {
  width: 222px;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #DDD;
  background: #FFF;
  color: #545454;
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
}

/* Модификатор .open */
.custom-select .selected.open {
  border: 1px solid #2F80ED;
  border-radius: 4px;
}

/* Псевдо-элемент :after */
.custom-select .selected:after {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-color: #A9A9A9 transparent transparent transparent;
  content: "";
}

/* Дочерний .items */
.custom-select .items {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 1;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0px 0px 6px 0px rgba(148, 181, 225, 0.35);
  background-color: #FFF;
  color: #545454;
  text-transform: uppercase;
}

/* Вложенный .items div */
.custom-select .items div {
  padding: 10px 8px 10px 16px;
  color: #545454;
  cursor: pointer;
  user-select: none;
}

/* Псевдокласс :hover */
.custom-select .items div:hover {
  background-color: #EAF2FD;
}

/* Элемент .selectHide */
.selectHide {
  display: none;
}

/* Элемент .test */
.test {
  position: relative;
}

/* Элемент .custom-select__icon */
.custom-select__icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>