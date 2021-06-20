<template>
  <div class="grid grid-cols-4 gap-4 w-10/12 mx-auto mt-10 p-5">
    <div class="col-span-3 shadow-lg p-2">
      <div class="grid grid-cols-2 gap-4 mb-2">
        <h5 class="font-bold text-indigo-400">Customers</h5>
        <div class="text-right">
          <router-link class="transition-all shadow-xl hover:shadow-sm rounded-xl text-white font-bold px-2 py-0.5 bg-gradient-to-r bg-indigo-300 bg-blue-200"
                       to="/recover">
            Recover
          </router-link>
        </div>
      </div>
      <hr/>
      <ul>
        <li v-for="user in Users" :key="user.id" class="p-2 shadow-lg hover:shadow-sm mb-2 relative">
          <template v-if="!user.isEditMode">
            {{ user.name }}
            <p class="text-sm text-gray-400">{{ user.note }}</p>
            <div class="absolute top-1/2 right-0.5 transform -translate-y-1/2">
              <button
                  @click.prevent="startEditMode(user.id)"
                  class="bg-blue-400 text-white px-2 py-0.5 rounded-l-2xl rounded-r-none transition-all transform hover:-translate-x-1.5">
                Edit
              </button>
              <button
                  @click.prevent="deleteUser(user.id)"
                  class="bg-red-600 text-white px-2 py-0.5 rounded-r-2xl rounded-l-none transition-all transform hover:translate-x-1.5">
                Remove
              </button>
            </div>
          </template>
          <template v-else>
            Editing asfdd
          </template>
        </li>
      </ul>
    </div>
    <div class="shadow-lg p-2">
      <AddUser :user="UserBeingEdited" @add:user="userAdded" @edit:cancel="editCancelled"
               @edit:user="userEdited"></AddUser>
    </div>
  </div>
</template>

<script setup>
import AddUser from '../components/AddUser.vue';
import {useStore} from "vuex";
import {computed, ref} from "vue";

const store = useStore();

const UserBeingEdited = ref(null);

const userAdded = ($event) => {
  const addedUser = $event;
  addedUser.id = Symbol();
  store.commit("addUser", addedUser);
};

const editCancelled = () => {
  UserBeingEdited.value = null;
}

const userEdited = ($event) => {
  store.commit("updateUser", $event);
  UserBeingEdited.value = null;
};

const deleteUser = (userId) => {
  if (UserBeingEdited.value !== null && UserBeingEdited.value.id == userId) {
    UserBeingEdited.value = null;
  }
  store.commit("deleteUser", userId);
};
const Users = computed(() => store.getters.availableUsers);
const startEditMode = (id) => {
  UserBeingEdited.value = Users.value.find(x => x.id === id);
};
</script>

<style scoped>

</style>