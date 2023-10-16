<template>

  <AppHeader :wrapContent="true">
    <!-- передаем логотип в слот logo -->
    <template v-slot:logo>
      <div class="contact-avatar">
        {{ contact.name[0] }}
      </div>
    </template>

    <!-- передаем заголовок в слот title -->
    <template v-slot:title>
      <h1 class="contact-avatar__title">{{ contact.name }}</h1>
    </template>

    <!-- передаем кнопку закрытия в слот close -->
    <template v-slot:close>
      <ClossedIcon class="contact-add__button-closed"/>
    </template>
  </AppHeader>

  <!-- Форма редактирования контакта -->
  <form class="contact-form" @submit.prevent="submitForm">

    <Loader v-if="isLoading" class="contact-form__loader" message="Контакт удален"/>


    <!-- Заголовок формы -->
    <h2 class="contact-form__title">Новый контакт</h2>

    <!-- Поле для ввода имени -->
    <div class="form-group">
      <div class="form-group__wrapper">
        <label class="form-group__label" for="name">Имя</label>

        <span v-if="!nameEditable" @click="editName" class="form-group__input form-group__input--noActive">{{
            name
          }}</span>

        <input
            v-else
            class="form-group__input"
            type="text"
            id="name"
            v-model="name"
            @input="validateName"
            :placeholder=contact.name
            @blur="editNameClose"
            ref="nameInput"
        />
      </div>
    </div>

    <!-- Поле для ввода email -->
    <div class="form-group">
      <div class="form-group__wrapper">
        <label class="form-group__label" for="email">Email</label>

        <span
            v-if="!emailEditable"
            @click="editEmail"
            class="form-group__input form-group__input--noActive">
          {{
            email
          }}
        </span>

        <input
            v-else
            class="form-group__input"
            type="email" id="email"
            v-model="email"
            :placeholder=contact.email
            @blur="editEmailClose"
            ref="emailInput"
        />
      </div>
    </div>

    <!-- Поле для ввода телефона -->
    <div class="form-group">
      <div class="form-group__wrapper">
        <label class="form-group__label" for="phone">Телефон</label>

        <span
            v-if="!phoneEditable"
            @click="editPhone"
            class="form-group__input form-group__input--noActive">
          {{
            phone
          }}
        </span>

        <input
            v-else
            class="form-group__input"
            type="tel" id="phone"
            v-model="phone"
            v-maska data-maska="+7 (###) ###-##-##"
            @input="validatePhone"
            :placeholder=contact.phone
            @blur="editPhoneClose"
            ref="phoneInput"
        />
      </div>
    </div>

    <!-- Поле для выбора категории -->
    <div class="form-group">
      <div class="form-group__wrapper">
        <label class="form-group__label" for="category">Категория</label>

        <!-- Кастомный селект с опциями -->
        <div class="custom-select"
             tabindex="0"
             @blur="open = false"
        >
          <!-- Выбранная опция -->
          <div class="selected"
               :class="{ open: open }"
               @click="open = !open"

          >
         <span :class="{default: selected === defaultText.value}">
        {{ defaultText }}
      </span>
          </div>

          <!-- Список опций -->
          <div class="items"
               :class="{ selectHide: !open }"
          >

            <!-- Опция с циклом по массиву options -->
            <div
                v-for="(option, i) of options"
                :key="i"
                @click="selectOption(option)"

            >
              <span>{{ option }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Поле даты -->
    <div class="form-group">
      <div class="form-group__wrapper">
        <label class="form-group__label" for="date">Создан</label>

        <input class="form-group__input form-group__input--date"
               type="text" id="date"

               @input="validateEmail"
               :placeholder="formatDate(contact.date)"
               disabled
        />
      </div>
    </div>


    <!-- Кнопка для сохранения контакта -->
    <div class="contact-form__button-wrapper"

    >
      <ButtonSave @click="contactEdit()"/>
      <ButtonDelete @click="contactDelete(contact.id)"/>

    </div>

    н
  </form>


</template>


<script setup lang="ts">
// Импортируем компоненты и иконки
import ClossedIcon from "@/components/icons/ClossedIcon.vue";
import AppHeader from "@/components/AppHeader.vue";
import ButtonDelete from "@/components/ContactList/ButtonDelete.vue";
import Loader from "@/components/Loader.vue";

// Импортируем функции из vue, vue-router и contactsStore
import {ref, onMounted, nextTick} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useContactsStore} from "@/stores/contactsStore";
import ButtonSave from "@/components/ContactForm/ButtonSave.vue";

// Импортируем библиотеку для работы с датами
import dayjs from "dayjs";

// Импорт плагина для маскирования ввода
import {vMaska} from "maska"


// Определение списка категорий и текста по умолчанию
const options = ["Родственник", "Коллега"];
let open = ref(false);


// Получаем объект маршрута и хранилище контактов
const route = useRoute()
const router = useRouter()

const contactsStore = useContactsStore()

// Получаем id контакта из параметров маршрута
const id = route.params.id

// Создаем реактивные ссылки для контакта и его полей
const contact = ref(null)

const name = ref('')
const email = ref('')
const phone = ref('')
const category = ref('')
const date = ref('')

// Находим контакт по id в хранилище
contact.value = contactsStore.contacts.find(c => c.id == id)

let selected = ref(''); // категория контакта
const defaultText = ref(''); // текст по умолчанию

// Создаем реактивные ссылки для режимов редактирования полей
const nameEditable = ref(false)
const emailEditable = ref(false)
const phoneEditable = ref(false)
const categoryEditable = ref(false)

// Создаем реактивные ссылки для элементов ввода полей
const nameInput = ref(null)
const emailInput = ref(null)
const phoneInput = ref(null)
const categoryInput = ref(null)

// индикатор загрузки
const isLoading = ref(false);
const loaderMessage = ref('');

// Функция для перехода в режим редактирования имени и фокусировки на элементе ввода
const editName = async () => {
  nameEditable.value = true

  await nextTick(() => {
    if (nameEditable.value) {
      nameInput.value.focus()
    }
  })
}

// Переход в режим редактирования email и фокусировки
const editEmail = async () => {
  emailEditable.value = true

  await nextTick(() => {
    if (emailEditable.value) {
      emailInput.value.focus()
    }
  })
}

const editPhone = async () => {
  phoneEditable.value = true

  await nextTick(() => {
    if (phoneEditable.value) {
      phoneInput.value.focus()
    }
  })
}

// Функция для выбора опции из селекта
const selectOption = (option) => {
  // Установка выбранной опции
  defaultText.value = option;

  selected.value = option;

  if (option !== defaultText) {
    defaultText.value = option;
  } else {
    defaultText.value = contact.category;
  }

  // Закрытие селекта
  open.value = false;

  // Отправка события с выбранной опцией, если она не пустая
  if (option !== defaultText) {
    emit("input", option);
  }
}

// Функция для выхода из режима редактирования имени
const editNameClose = () => {
  nameEditable.value = false
}

// Функция для выхода из режима редактирования email
const editEmailClose = () => {
  emailEditable.value = false
}

// Функция для форматирования даты в виде ДД.ММ.ГГ
function formatDate(dateString) {
  const date = dayjs(dateString);
  return date.format('DD.MM.YY');
}

// Функция для удаления контакта по id из хранилища
function contactDelete(id) {
  isLoading.value = true;
  loaderMessage.value = 'Контакт удален';
  setTimeout(function () {
    contactsStore.deleteContact(id);
    isLoading.value = false;
    router.push('/');
  }, 1000);
}


// Функция доя изменения контакта по id из хранилища
function contactEdit(contact) {

  isLoading.value = true;

  contactsStore.isLoader = true;

  console.log(contactsStore.isLoader);

  loaderMessage.value = 'Контакт изменен';
  setTimeout(function () {
    contactsStore.editContact({
      id: id,
      name: name.value,
      email: email.value,
      phone: phone.value,
      category: defaultText.value,
      date: date
    });

    isLoading.value = false;
    contactsStore.isLoader = false;

  }, 1000);
}


// Определение события для передачи значения категории наружу
const emit = defineEmits(['input']);

// Хук, который выполняется после монтирования компонента
onMounted(() => {
  // Получаем id контакта из параметров маршрута

  // Находим контакт по id в хранилище
  contact.value = contactsStore.contacts.find(c => c.id == id)

  // Присваиваем значения полей контакта реактивным ссылкам
  name.value = contact.value.name
  email.value = contact.value.email
  phone.value = contact.value.phone
  category.value = contact.value.category
  date.value = contact.value.date
  defaultText.value = contact.value.category


  // Отправка события с значением по умолчанию
  emit('input', selected.value);

})

</script>


<style scoped>
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

.contact-avatar__title {
  color: #DDD;
  text-align: center;
  font-family: Proxima Nova Bold, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.contact-add__button-closed {
  position: absolute;
  right: 12px;
  top: 6px;
}


/* Стили для формы добавления нового контакта */
.contact-form {
  /* Размеры и отступы */
  width: 352px;
  min-height: 405px;
  padding: 32px 20px 48px 20px;
  margin: 0 auto;
  margin-top: 24px;

  /* Выравнивание и расстояние между элементами */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;

  position: relative;

  /* Цвет и тень фона */
  background: #FFF;
  box-shadow: 0px 0px 6px 0px rgba(148, 181, 225, 0.35);
}

@media (min-width: 576px) {
  .contact-form {
    width: 552px;
    padding: 32px 48px 48px 48px;
  }
}

@media (min-width: 768px) {
  .contact-form {
    width: 704px;
    padding: 48px 64px 64px 64px;
  }
}

/* Стили для заголовка формы */
.contact-form__title {
  /* Цвет и шрифт текста */
  color: #545454;
  font-family: Proxima Nova Bold, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
}

/* Стили для группы полей формы */
.form-group {
  /* Размеры и позиционирование */
  width: 100%;
  min-height: 40px;
  position: relative;

  /* Выравнивание элементов */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Стили для обертки группы полей */
.form-group__wrapper {
  /* Размеры и выравнивание элементов */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Стили для метки поля формы */
.form-group__label {
  /* Размеры и отступы */
  width: 72px;
  padding-right: 40px;

  /* Цвет и шрифт текста */
  color: #545454;
  font-family: Proxima Nova Bold, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;

  /* Выравнивание текста */
  display: inline;
  flex-direction: column;
  justify-content: center;

}

/* Стили для поля ввода формы */
.form-group__input {
  /* Размеры и отступы */
  width: 228px;
  height: 40px;
  padding: 8px;

  /* Цвет и шрифт текста */
  color: #545454;
  font-family: Proxima Nova Regular, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;

  /* Фон и рамка поля */
  background: #FFF;
  border-radius: 4px;
  border: 1px solid #DDD;
  caret-color: #2F80ED;
}

@media (min-width: 576px) {
  .form-group__input {
    width: 288px;
  }
}

@media (min-width: 768px) {
  .form-group__input {
    width: 408px;
  }
}

.form-group__input--noActive {
  display: flex;
  align-items: center;
  text-align: left;
}

.form-group__input--date {
  border: unset;
}


/* Стили для подсказки поля ввода формы */
.form-group__input::placeholder {
  /* Цвет и шрифт текста */
  color: #A9A9A9;
  font-family: Proxima Nova Regular, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;

}

.form-group__input--date::placeholder {
  color: #545454;
  font-family: Proxima Nova Regular, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/* Стили для сообщения об ошибке поля формы */
.form-group__error-message {
  /* Размеры и позиционирование */
  position: absolute;
  right: 0;
  bottom: -15px;

  /* Цвет и шрифт текста */
  color: #EB5757;
  font-family: Proxima Nova Regular, sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
}

/* Стили для текста по умолчанию в селекте категории */
.default {
  /* Цвет и шрифт текста */
  color: #A9A9A9;
  font-family: Proxima Nova Regular, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  text-transform: none;
}

/* Стили для кнопки сохранения контакта */
.contact-form__button-wrapper {
  /* Выравнивание по центру */
  margin: 0 auto;
  display: inline-flex;
  gap: 24px;
}

@media (min-width: 576px) {
  .contact-form__button-wrapper {
    margin-left: 173px;
    gap: 6px;
  }
}

@media (min-width: 768px) {
  .contact-form__button-wrapper {
    margin-left: 173px;
    gap: 24px;
  }
}


/* Стили для кастомного селекта категории */
.custom-select {
  /* Размеры и позиционирование */
  width: 228px;
  position: relative;
  outline: none;

  /* Выравнивание и высота строки текста */
  text-align: left;
  line-height: 20px;
}


/* Стили для выбранной опции селекта */
.custom-select .selected {
  /* Размеры и отступы */
  width: 228px;
  height: 40px;
  padding: 8px;

  /* Фон и рамка опции */
  background: #FFF;
  border-radius: 4px;
  border: 1px solid #DDD;

  /* Цвет и шрифт текста */
  color: #545454;
  font-family: Proxima Nova Regular, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;

  /* Выравнивание элементов */
  display: flex;
  align-items: center;

  /* Курсор и запрет выделения текста */
  cursor: pointer;
  user-select: none;

  /* Преобразование текста в верхний регистр */
  text-transform: uppercase;
}

@media (min-width: 576px) {
  .custom-select {
    width: 288px;
  }

  .custom-select .selected {
    width: 288px;
  }
}

@media (min-width: 768px) {
  .custom-select {
    width: 408px;
  }

  .custom-select .selected {
    width: 408px;
  }
}


/* Стили для открытой опции селекта */
.custom-select .selected.open {
  /* Изменение цвета рамки на синий */
  border-color: #2F80ED;
}

/* Стили для стрелки селекта */
.custom-select .selected:after {
  /* Размеры и позиционирование */
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 0;
  height: 0;

  /* Форма и цвет стрелки */
  border: 4px solid transparent;
  border-color: #A9A9A9 transparent transparent transparent;

  /* Содержимое псевдо-элемента */
  content: "";
}

/* Стили для списка опций селекта */
.custom-select .items {
  /* Размеры и позиционирование */
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  z-index: 1;

  /* Скрытие переполнения содержимого */
  overflow: hidden;

  /* Фон и тень списка */
  background-color: #FFF;
  box-shadow: 0px 0px 6px 0px rgba(148, 181, 225, 0.35);

  /* Цвет и шрифт текста */
  color: #545454;
  font-family: Proxima Nova Regular, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;

  /* Преобразование текста в верхний регистр */
  text-transform: uppercase;

}

/* Стили для элементов списка опций селекта */
.custom-select .items div {
  /* Отступы элементов */
  padding: 10px 8px 10px 16px;

  /* Цвет текста элементов */
  color: #545454;

  /* Курсор и запрет выделения текста элементов */
  cursor: pointer;
  user-select: none;
}

/* Стили для элементов списка при наведении курсора */
.custom-select .items div:hover {
  /* Изменение цвета фона на светло-голубой */
  background-color: #EAF2FD;
}

/* Стили для скрытого списка опций селекта */
.selectHide {
  /* Скрытие элемента */
  display: none;
}

</style>