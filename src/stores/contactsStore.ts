import {defineStore} from 'pinia'

// Создание хранилища
export const useContactsStore = defineStore({

    // уникальное имя стора
    id: 'contactsStore',

    // начальное состояние стора
    state: () => ({
        // Массив элементов
        contacts: [
            {
                id: 1,
                name: 'Иванов Иван Иванович',
                phone: '+7 (999) 999-99-99',
                email: 'test@mail.ru',
                category: 'Коллеги',
                date: '1971-03-25'
            },

            {
                id: 2,
                name: 'Петров Петр Петрович',
                phone: '+7 (999) 999-99-99',
                email: 'test2@mail.ru',
                category: 'Родственник',
                date: '1991-08-01'
            },

            {
                id: 3,
                name: 'Сидоров Сидор Сидорович',
                phone: '+7 (999) 999-99-99',
                email: 'test3@mail.ru',
                category: 'Родственник',
                date: '1981-03-25'
            }
        ],

        // Состояние загрузки
        isLoader: false,

        // Выбранная категория
        selectedCategory: 'Все',
    }),

    // Действия
    actions: {

        // экшн для установки массива контактов
        setContacts(contacts) {
            this.contacts = contacts;
        },

        // экшн для добавления нового контакта
        addContact(contact) {
            this.contacts.push(contact);
            console.log(this.contacts)
        },

        deleteContact(id) {
            // экшн для удаления контакта по id
            this.contacts = this.contacts.filter((contact) => contact.id !== id);
        },

        setFormVisible(visible) {
            // экшн для установки флага видимости формы
            this.formVisible = visible;
        },

        // Функция для выбора категории
        selectCategory(category) {
            // Устанавливаем выбранную категорию в состояние хранилища
            this.selectedCategory = category

            console.log(this.selectedCategory)
        },

        // Функция для редактирования контакта
        editContact(contact) {
            console.log(contact.name)

            // Находим индекс контакта в массиве
            const index = this.contacts.findIndex(c => c.id == contact.id)

            // Если контакт найден, то заменяем его в массиве
            if (index !== -1) {
                this.contacts[index] = contact
            }
        },

    },

    getters: {
        // Массив категорий
        categories(state) {
            // Получаем уникальные категории из контактов
            const categories = [...new Set(state.contacts.map(c => c.category))]

            // Возвращаем массив категорий
            return categories
        },

        // Массив отфильтрованных контактов
        filteredContacts(state) {

            // Принимаем параметр sortByDate
            return function (sortByDate) {

                // Сортируем контакты по дате
                let filterDate = state.contacts.sort((a, b) => new Date(a.date) - new Date(b.date))

                // Если выбрана категория "Все", то возвращаем все контакты
                if (state.selectedCategory === 'Все') {
                    return filterDate
                }

                // Иначе фильтруем контакты по выбранной категории
                let filtered = state.contacts.filter(c => c.category === state.selectedCategory)

                // Сортируем по дате
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date))


                // Возвращаем отфильтрованные контакты
                return filtered
            }
        },
    },
})
