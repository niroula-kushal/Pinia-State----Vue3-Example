<template>
  <h5 class="font-bold text-indigo-400">
    <span v-if="IsEditMode">
      Edit Customer
    </span>
    <span v-else>
      Add Customer
    </span>
  </h5>
  <hr>
  <form @submit.prevent="Save">
    <div>
      <label for="name">Name</label>
      <input type="text" class="w-full border-2 border-black px-1 py-0.5" id="name" v-model="Name" required>
    </div>
    <div>
      <label for="Description">Internal Note</label>
      <textarea rows="5" class="w-full border-2 border-black px-1 py-0.5" id="Description" v-model="InternalNote"
                required></textarea>
    </div>
    <button class="px-2 py-1 text-white font-bold bg-gradient-to-r from-green-400 to-green-600 rounded-l-2xl">
      Save
    </button>
    <button class="px-2 py-1 text-white font-bold bg-gradient-to-r from-red-400 to-red-600 rounded-r-2xl">
      Cancel
    </button>
  </form>
</template>

<script setup>
import {computed, defineEmit, defineProps, ref, watch} from "vue";

const emit = defineEmit([
  "add:user",
  "edit:cancel",
  "edit:user"
]);
const props = defineProps({
  user: {
    required: false
  }
});

const IsEditMode = computed(() => props.user !== null);

const Name = ref("");
const InternalNote = ref("");

const InitializeStates = () => {
  Name.value = "";
  InternalNote.value = "";
};

watch(() => props.user, (user) => {
  if (user !== null) {
    Name.value = user.name;
    InternalNote.value = user.note;
  } else {
    InitializeStates();
  }
});

const Save = () => {
  try {
    if (!Name.value) throw "Input name";
    if (!InternalNote.value) throw "Input note";
    if (IsEditMode.value) {
      emit("edit:user", {
        name: Name.value,
        note: InternalNote.value,
        id: props.user.id
      })
    } else {
      emit("add:user", {
        name: Name.value,
        note: InternalNote.value
      });
    }
    InitializeStates();
  } catch (e) {
    alert(e);
  }
};

const Cancel = () => {
  InitializeStates();
  if (IsEditMode.value) {
    emit("edit:cancel");
  }
};
</script>

<style scoped>

</style>