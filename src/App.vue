<!--<script setup lang="ts">-->
<!--import { RouterLink, RouterView } from 'vue-router'-->
<!--import HelloWorld from './components/HelloWorld.vue'-->
<!--</script>-->

<!--<template>-->
<!--&lt;!&ndash;  <header>&ndash;&gt;-->
<!--&lt;!&ndash;    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />&ndash;&gt;-->

<!--&lt;!&ndash;    <div class="wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;      <HelloWorld msg="You did it!" />&ndash;&gt;-->

<!--&lt;!&ndash;      <nav>&ndash;&gt;-->
<!--&lt;!&ndash;        <RouterLink to="/">Home</RouterLink>&ndash;&gt;-->
<!--&lt;!&ndash;        <RouterLink to="/about">About</RouterLink>&ndash;&gt;-->
<!--&lt;!&ndash;      </nav>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </header>&ndash;&gt;-->

<!--&lt;!&ndash;  <RouterView />&ndash;&gt;-->


<!--  -->
<!--</template>-->

<!--<style scoped>-->
<!--header {-->
<!--  line-height: 1.5;-->
<!--  max-height: 100vh;-->
<!--}-->

<!--.logo {-->
<!--  display: block;-->
<!--  margin: 0 auto 2rem;-->
<!--}-->

<!--nav {-->
<!--  width: 100%;-->
<!--  font-size: 12px;-->
<!--  text-align: center;-->
<!--  margin-top: 2rem;-->
<!--}-->

<!--nav a.router-link-exact-active {-->
<!--  color: var(&#45;&#45;color-text);-->
<!--}-->

<!--nav a.router-link-exact-active:hover {-->
<!--  background-color: transparent;-->
<!--}-->

<!--nav a {-->
<!--  display: inline-block;-->
<!--  padding: 0 1rem;-->
<!--  border-left: 1px solid var(&#45;&#45;color-border);-->
<!--}-->

<!--nav a:first-of-type {-->
<!--  border: 0;-->
<!--}-->

<!--@media (min-width: 1024px) {-->
<!--  header {-->
<!--    display: flex;-->
<!--    place-items: center;-->
<!--    padding-right: calc(var(&#45;&#45;section-gap) / 2);-->
<!--  }-->

<!--  .logo {-->
<!--    margin: 0 2rem 0 0;-->
<!--  }-->

<!--  header .wrapper {-->
<!--    display: flex;-->
<!--    place-items: flex-start;-->
<!--    flex-wrap: wrap;-->
<!--  }-->

<!--  nav {-->
<!--    text-align: left;-->
<!--    margin-left: -1rem;-->
<!--    font-size: 1rem;-->

<!--    padding: 1rem 0;-->
<!--    margin-top: 1rem;-->
<!--  }-->
<!--}-->
<!--</style>-->

<template>
  <div>
    <div class="header">
      <h1>Книга контактов</h1>
    </div>
    <div class="tabs">
      <div
          class="tab"
          :class="{ active: currentTab === 'all' }"
          @click="currentTab = 'all'"
      >
        Все
      </div>
      <div
          class="tab"
          :class="{ active: currentTab === 'contacts' }"
          @click="currentTab = 'contacts'"
      >
        Контакты
      </div>
      <div
          class="tab"
          :class="{ active: currentTab === 'add' }"
          @click="currentTab = 'add'"
      >
        Добавить
      </div>
    </div>
    <div class="list" v-if="currentTab === 'all' || currentTab === 'contacts'">
      <div class="contact" v-for="contact in contacts" :key="contact.id">
        <h3>{{ contact.name }}</h3>
        <p>{{ contact.phone }}</p>
        <p>{{ contact.email }}</p>
      </div>
    </div>
    <div v-if="currentTab === 'add'">
      <!-- Форма для добавления нового контакта -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: "all",
      contacts: [
        {
          id: 1,
          name: "Артёмов Виктория",
          phone: "+7(987)654-78-90",
          email: "vika.artemova@example.com",
        },
        // Добавьте другие контакты здесь
      ],
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
/* Заголовок экрана */
.header {
  background-color: white;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Название экрана */
.header h1 {
  font-size: 24px;
  font-weight: bold;
}

/* Вкладки */
.tabs {
  background-color: white;
  height: 40px;
  display: flex;
}

/* Каждая вкладка */
.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Активная вкладка */
.tab.active {
  border-bottom: 3px solid blue;
}

/* Список контактов */
.list {
  background-color: #f1f1f1;
  padding: 10px;
}

/* Каждый контакт */
.contact {
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
}

/* Имя контакта */
.contact h3 {
  font-size: 18px;
}

/* Номер телефона и адрес электронной почты контакта */
.contact p {
  font-size: 14px;
}
</style>
