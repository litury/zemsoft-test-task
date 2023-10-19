<template>
  <div class="filter">
    <div class="filter__wrapper">
    <FilterSelect />

    <ButtonAdd
    :normalComponent="ButtonIcon"
    :loaderComponent="ButtonSaveLoader"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import ButtonAdd from "@/components/ContactDetails/ButtonAdd.vue";
import FilterSelect from "@/components/ContactList/FilterSelect.vue";

import ButtonIcon from "@/components/icons/ButtonIcon.vue";
import ButtonSaveLoader from "@/components/icons/ButtonSaveLoader.vue";


</script>

<style scoped>

.filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #EAF2FD;
  background: #F9FCFF;
}

.filter__wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
}


@media (min-width: 1200px) {
  .filter {
    padding: 8px 48px;
  }

  .filter__wrapper {
    display: flex;
    justify-content: space-between;
    width: 990px;
    margin: 0 auto;
  }
}



</style>