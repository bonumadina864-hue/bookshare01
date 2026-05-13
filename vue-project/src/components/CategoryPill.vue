<script setup lang="ts">
defineProps<{
  name: string;
  icon: string;
  active: boolean;
}>();

defineEmits(['click']);
</script>

<template>
  <button :class="['pill', { active: active }]" @click="$emit('click')">
    <span class="pill-icon" v-html="icon"></span>
    <span class="pill-name">{{ name }}</span>
  </button>
</template>

<style scoped>
.pill {
  padding: 10px 20px;
  background: var(--surface);
  border-radius: 50px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  box-shadow: var(--shadow);
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid var(--border);
  font-family: inherit;
  color: var(--text);
}

.pill.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.pill:hover:not(.active) {
  background: var(--bg);
  transform: translateY(-2px);
}

.pill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.pill-icon svg) {
  stroke: currentColor;
}
</style>
