<template>

  <!-- Форма для добавления нового контакта -->
  <form class="contact-form">

    <Loader v-if="isLoading" class="contact-form__loader" message="Контакт успешно создан"/>

    <!-- Заголовок формы -->
    <h2 class="contact-form__title">Новый контакт</h2>

    <!-- Поле для ввода имени -->
    <div class="form-group">
      <div class="form-group__wrapper">
        <label class="form-group__label" for="name">Имя</label>
        <input
            class="form-group__input"
            type="text"
            id="name"
            v-model="names"
            @input="validateName"
            placeholder="Например “Андрей...”"
        />
      </div>

      <!-- Сообщение об ошибке, если имя невалидно -->
      <span class="form-group__error-message" v-if="nameError">{{ nameError }}</span>
    </div>

    <!-- Поле для ввода email -->
    <div class="form-group">
      <div class="form-group__wrapper">
        <label class="form-group__label" for="email">Email</label>
        <input class="form-group__input"
               type="email" id="email"
               v-model="email"
               @input="validateEmail"
               placeholder="Например «pochta@domain.ru»..."
        />

        <!-- Сообщение об ошибке, если email невалидно -->
        <span class="form-group__error-message" v-if="emailError">{{ emailError }}</span>
      </div>
    </div>

    <!-- Поле для ввода телефона -->
    <div class="form-group">
      <div class="form-group__wrapper">
        <label class="form-group__label" for="phone">Телефон</label>
        <input class="form-group__input"
               type="tel" id="phone"
               v-model="phone"
               v-maska data-maska="+7 (###) ###-##-##"
               @input="validatePhone"
               placeholder="+7 (___) ___-__-__"
        />

        <!-- Сообщение об ошибке, если телефон невалидно -->
        <span class="form-group__error-message" v-if="phoneError"> {{ phoneError }} </span>
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
         <span :class="{default: selected === defaultText}">
        {{ selected }}
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

          <!-- Сообщение об ошибке, если категория не выбрана -->
          <span class="form-group__error-message" v-if="categoryError">{{ categoryError }}</span>
        </div>
      </div>
    </div>

    <!-- Кнопка для сохранения контакта -->
    <div class="contact-form__button"
         @click="validateForm"
    >
      <ButtonSave/>
    </div>
  </form>
</template>

<script setup>
// Импорт компонента кнопки сохранения
import ButtonSave from "@/components/ContactForm/ButtonSave.vue";
// Импорт компонента иконки загрузки
import Loader from "@/components/Loader.vue";

// Импорт необходимых функций из vue
import {ref, onMounted, watch} from "vue";

// Импорт хранилища контактов и функции для преобразования данных
import {useContactsStore} from "@/stores/contactsStore";
import {storeToRefs} from "pinia";

// Импорт плагина для маскирования ввода
import {vMaska} from "maska"

// Получение доступа к данным хранилища
const contactsStore = useContactsStore();

const {contacts} = storeToRefs(contactsStore);

// Определение списка категорий и текста по умолчанию
const options = ["Родственник", "Коллега"];
const defaultText = "Не выбрано"

// Создание рефов для данных компонента
const names = ref(""); // имя контакта
const nameError = ref(''); // ошибка имени

const email = ref(""); // e-mail контакта
const emailError = ref(''); // ошибка e-mail

const phone = ref(""); // телефон контакта
const phoneError = ref("")

let selected = ref(defaultText); // категория контакта
const categoryError = ref(''); // ошибка категории

let open = ref(false); // состояние открытия селекта

const isLoading = ref(false); // состояние загрузки


// Определение события для передачи значения категории наружу
const emit = defineEmits(['input']);

// Функция, выполняемая при монтировании компонента
onMounted(() => {
  // Отправка события с значением по умолчанию
  emit('input', selected.value);
  // Установка значения по умолчанию для выбранной категории
  selected.value = defaultText;
});

// Создание рефа для массива ошибок
const errors = ref([])

// Функция для валидации имени
function validateName() {
  // Обрезание пробелов в начале и конце имени
  const value = names.value.trim()

  // Проверка длины имени и установка соответствующего сообщения об ошибке
  if (value.length === 0) {
    nameError.value = ''
  } else if (value.length < 3) {
    nameError.value = 'Слишком короткое имя'
  } else {
    nameError.value = ''
  }
}

// Функция для валидации email
function validateEmail() {
  // Получение значения email
  const value = email.value

  // Проверка наличия значения и очистка сообщения об ошибке, если нет
  if (!value) {
    emailError.value = ''
    return
  }

  // Регулярное выражение для проверки формата email
  const regex = /^\S+@\S+\.\S+$/

  // Проверка соответствия значения регулярному выражению и установка соответствующего сообщения об ошибке
  if (regex.test(value)) {
    emailError.value = ''
  } else {
    emailError.value = 'Некорректный email'
  }
}

// Функция для валидации телефона
function validatePhone() {
  // Проверка наличия значения телефона и очистка сообщения об ошибке, если нет
  if (!phone.value) {
    phoneError.value = null

    // Проверка длины телефона и установка соответствующего сообщения об ошибке, если меньше нужной
  } else if (phone.value.length < 18) {
    phoneError.value = 'Слишком короткий номер'
  } else {
    phoneError.value = null
  }
}

// Функция для валидации категории
function validateCategory() {
  // Проверка выбранности категории и установка соответствующего сообщения об ошибке, если нет
  if (!selected.value === defaultText) {
    categoryError.value = 'Выберите категорию'
  } else {
    categoryError.value = ''
  }
}

// Функция для выбора опции из селекта
const selectOption = (option) => {
  // Установка выбранной опции
  selected.value = option;
  // Закрытие селекта
  open.value = false;

  // Отправка события с выбранной опцией, если она не пустая
  if (option !== defaultText) {
    emit("input", option);
  }
}

// Слежение за изменением выбранной категории и вызов функции валидации
watch(selected, validateCategory)

// Функция для валидации всей формы
const validateForm = (e) => {

  // Отмена стандартного поведения формы
  e.preventDefault()

  // Проверка заполненности полей и добавление ошибок в массив, если есть
  if (!names.value) {
    nameError.value = 'Поле не может быть пустым'
    errors.value.push(nameError.value)
  }

  if (!email.value) {
    emailError.value = 'Поле не может быть пустым'
    errors.value.push(emailError.value)
  }

  if (!phone.value) {
    phoneError.value = 'Поле не может быть пустым'
    errors.value.push(phoneError.value)
  }

  // Проверка выбранности категории и добавление ошибки в массив, если нет
  if (selected.value === defaultText) {
    categoryError.value = 'Поле не может быть пустым'
    errors.value.push(categoryError.value)
  } else if (selected.value !== defaultText) {
    categoryError.value = ''
  }

  if (!errors.value.length) {

    isLoading.value = true;
    contactsStore.isLoader = true;


    const nameVal = names.value;
    let emailVal = email.value;
    let phoneVal = phone.value;
    const categoryVal = selected.value;

    setTimeout(function () {

      contactsStore.addContact({
        id: new Date().getTime(),
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        category: categoryVal,
        date: new Date().toISOString().slice(0, 10)
      });

      isLoading.value = false;

      contactsStore.isLoader = false;
    }, 1000);

    // Очистка полей формы
    names.value = "";
    email.value = "";
    phone.value = "";
    selected.value = defaultText;
  }


  // Очистка массива ошибок
  errors.value = []
};
</script>


<style scoped>
/* Стили для формы добавления нового контакта */
.contact-form {
  /* Размеры и отступы */
  width: 352px;
  min-height: 405px;
  padding: 32px 20px 48px 20px;
  margin: 0 auto;
  margin-top: 24px;

  /* Позиционирование */
  position: relative;

  /* Выравнивание и расстояние между элементами */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;

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

.form-group__input:focus {
  /* Фокусировка на поле */
  outline: none;
  border: 1px solid #2F80ED;;
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
.contact-form__button {
  /* Выравнивание по центру */
  margin: 0 auto;
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
