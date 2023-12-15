<template>
    <div class="event-log-item">
        <span class="name">{{ props.name }}</span>
        <code v-if="props.details.length > 0">{{ props.details }}</code>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string
    details: unknown[]
}>();
</script>

<style scoped lang="scss">
.event-log-item {
    padding: 8px 0;

    &:not(:first-child) {
        border-top: 1px solid var(--vp-c-divider);
    }

    > .name {
        font-weight: bold;
    }

    > code {
        margin-left: 4px;
    }
}
</style>
