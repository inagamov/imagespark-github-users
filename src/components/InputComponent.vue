<template>
  <div class="input__container">
    <slot name="prepend" />

    <input
      v-model="model"
      placeholder="Search or jump to..."
      @input="$emit('input', model)"
    />

    <slot name="append" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

defineEmits(["input"]);

const props = defineProps({
  value: { default: null },
});

const model = ref(props.value);

watch(
  () => props.value,
  () => {
    model.value = props.value;
  }
);
</script>

<style scoped lang="scss">
.input__container {
  border: 1px solid $grey;
  display: flex;
  border-radius: 6px;
  height: 30px;
  padding: 0 8px;
  margin: auto 0;

  input {
    border: none;
    outline: none;
    width: 100%;
    margin: 0 8px;
  }
}

input:focus {
  .input__container {
    outline: 2px solid $accent;
  }
}
</style>
