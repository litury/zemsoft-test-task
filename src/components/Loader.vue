<script setup lang="ts">
import LoaderIcon from "@/components/icons/LoaderIcon.vue";

const props = defineProps({
  message: {
    type: String,
    default: 'Загрузка...'
  }
})

</script>

<template>
  <div class="loader">
    <LoaderIcon/>
    <span class="loader__text">{{ message }}</span>
  </div>
</template>

<style scoped>
.loader {
  border-radius: 40px;
  background: #545454;
  box-shadow: 0px 0px 20px 0px rgba(176, 197, 222, 0.50);
  display: inline-flex;
  padding: 6px 8px;
  align-items: flex-start;
  gap: 12px;
  margin: 0 auto;

  color: #FFF;
  font-family: Proxima Nova Regular, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */

  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  white-space: nowrap
}

@media (min-width: 768px) {
  .loader {
    border-radius: 4px;
    background: #FFF;
    box-shadow: 0px 0px 16px 0px rgba(176, 197, 222, 0.50);
    display: inline-flex;
    padding: 12px 12px 12px 8px;
    align-items: flex-start;
    gap: 12px;

    color: #545454;

    position: absolute;
    left: 82px;
    top: unset;
    bottom: 24px;
  }
}


</style>