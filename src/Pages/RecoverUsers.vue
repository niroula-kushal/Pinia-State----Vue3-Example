<template>
  <div class="flex mt-5">
    <div class="mx-auto shadow-lg p-2 w-1/2">
      <h5 class="font-bold text-blue-400 text-center">Recover Customers</h5>
      <hr>
      <template v-if="Users.length > 0">
        <table class="table-auto w-full border-collapse border-gray-400 border-2 text-left">
          <thead>
          <tr>
            <th class="border px-2 py-1 bg-blue-200">
              Customer
            </th>
            <th class="border px-2 py-1 bg-blue-200">
              Action
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in Users" :key="user.id">
            <td class="border px-2 py-1">
              {{ user.name }}
              <br/>
              <span class="text-gray-500">
                {{ user.note }}
              </span>
            </td>
            <td class="border px-2 py-2">
              <button
                  @click.prevent="recoverUser(user.id)"
                  class="px-2 py-1 text-white bg-gradient-to-r from-blue-400 to-green-600 rounded-xl transition-all transform hover:skew-y-6 hover:from-green-500 hover:to-blue-400">
                Recover
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
      <template v-else>
        <h5 class="text-center">
          <span class="font-bold text-transparent bg-gradient-to-r from-blue-300 to-pink-400 bg-clip-text text-md">
             ¯\_(ツ)_/¯ No Deleted Customers. Go on, delete some customers first
          </span>
        </h5>
      </template>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const Users = computed(() => store.getters.deletedUsers);

const recoverUser = (userId) => {
  store.commit('recoverUser', userId);
};

</script>

<style scoped>

</style>