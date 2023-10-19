<template>
  <AppHeader :wrapContent="false">
    <!-- передаем логотип в слот logo -->
    <template v-slot:logo>
      <a class="contact-list__link" aria-label="Логотип компании">
        <LogotypeSvg/>
      </a>
    </template>

    <!-- передаем заголовок в слот title -->
    <template v-slot:title>
      <h2 class="contact-list__title">КНИГА КОНТАКТОВ</h2>
    </template>
  </AppHeader>

  <ContactFilter/>
  <ContactList/>
</template>


<script setup lang="ts">
import ContactFilter from "@/components/ContactDetails/ContactFilter.vue";
import AppHeader from "@/components/AppHeader.vue";
import ContactList from "@/components/ContactList/ContactList.vue";
import LogotypeSvg from "@/components/icons/LogotypeSvg.vue";

</script>


<style scoped>

.contact-list__title {
  color: #E0E0E0;
  font-family: Proxima Nova Bold, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}

</style>