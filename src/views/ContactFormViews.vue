<script setup lang="ts">
import ContactForm from "@/components/ContactForm/ContactForm.vue";
import ContactLogo from "@/components/icons/ContactLogo.vue";
import ClossedIcon from "@/components/icons/ClossedIcon.vue";
import AppHeader from "@/components/AppHeader.vue";

</script>

<template>
  <AppHeader :wrapContent="true">
    <!-- передаем логотип в слот logo -->
    <template v-slot:logo>
      <ContactLogo/>
    </template>

    <!-- передаем заголовок в слот title -->
    <template v-slot:title>
      <h1 class="contact-add__title">Добавить контакт</h1>
    </template>

    <!-- передаем кнопку закрытия в слот close -->
    <template v-slot:close>
      <ClossedIcon class="contact-add__button-closed"/>
    </template>
  </AppHeader>

  <ContactForm/>
</template>

<style scoped>

.contact-add__title {
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

</style>