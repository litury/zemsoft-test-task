<template>
  <button @click="handleClick" class="filter__button">
    <ButtonIcon/>
    {{ text }}
  </button>
</template>


<script setup lang="ts">
import ButtonIcon from "@/components/icons/ButtonIcon.vue";
import {useRouter} from 'vue-router'
import {onBeforeMount, onMounted, ref} from "vue";

const router = useRouter()

const handleClick = () => {
  router.push('/form')
}

const text = ref('Добавить')

let isWideScreen768 = ref(false)

function handleResize() {

  if (window.innerWidth >= 576) {
    text.value = 'Добавить контакт'

  } else {
    text.value = 'Добавить'
  }
}

onMounted(() => {
  handleResize()

  window.addEventListener('resize', handleResize)
})

onBeforeMount(() => {
  window.removeEventListener('resize', handleResize)
})


</script>


<style scoped>
.filter__button {

  /* Позиционирование */
  display: flex;

  /* Box model */
  padding: 8px 16px;

  /* Визуальное форматирование */
  color: #2F80ED;
  border-radius: 28px;
  border: 1px solid #2F80ED;

  /* Текст */
  text-align: center;
  font-family: Proxima Nova Bold, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  text-transform: uppercase;


  /* Визуальное выравнивание */
  justify-content: center;
  align-items: center;
  gap: 4px;

}
</style>