import {defineStore} from 'pinia'
import * as api from "@/api/apiHttpService";

// Создание хранилища
export const useContactsStore = defineStore({

    // уникальное имя стора
    id: 'contactsStore',

    // начальное состояние стора
    state: () => ({
        contacts: [], // Массив элементов
        formVisible: false // Состояние загрузки
    }),

    // Действия
    actions: {
        // методы для изменения состояния стора
        setContacts(contacts) {
            // экшн для установки массива контактов
            this.contacts = contacts;
        },
        addContact(contact) {
            // экшн для добавления нового контакта
            this.contacts.push(contact);
        },
        deleteContact(id) {
            // экшн для удаления контакта по id
            this.contacts = this.contacts.filter((contact) => contact.id !== id);
        },
        setFormVisible(visible) {
            // экшн для установки флага видимости формы
            this.formVisible = visible;
        },
    },

    getters: {
        // вычисляемые свойства стора
        getContactById: (state) => (id) => {
            // геттер для получения контакта по id
            return state.contacts.find((contact) => contact.id === id);
        },
    },
})
