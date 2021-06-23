<template>
  <router-view></router-view>
</template>

<script setup>

import {useUserStore} from "./store/store";
import {watch} from "vue";

const userStore = useUserStore();

watch(() => userStore.$state, (state) => {
  localStorage.setItem("userStoreData", JSON.stringify(state));
}, {
  deep : true
})
</script>

<style>

</style>
