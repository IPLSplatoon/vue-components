<template>
    <ipl-space
        class="ipl-pagination"
        :color="props.color"
    >
        <div class="page-select">
            <ipl-select
                v-model="model"
                :options="pageOptions"
            />
            <span> of {{ pluralize('page', props.maxPage) }}</span>
        </div>
        <div class="page-buttons">
            <ipl-spinner
                v-if="props.loading"
                size="2px"
                width="24px"
                color="var(--ipl-body-text-color)"
            />
            <ipl-button
                inline
                color="transparent"
                :icon="faChevronLeft"
                :disabled="props.modelValue === 1"
                @click="emit('update:modelValue', props.modelValue - 1)"
            />
            <ipl-button
                inline
                color="transparent"
                :icon="faChevronRight"
                :disabled="props.modelValue === props.maxPage"
                @click="emit('update:modelValue', props.modelValue + 1)"
            />
        </div>
    </ipl-space>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import IplSpace from './iplSpace.vue';
import IplSelect from './iplSelect.vue';
import IplButton from './iplButton.vue';
import IplSpinner from './iplSpinner.vue';
import { SpaceColor } from '../helpers/spaceColorHelper';
import { pluralize } from '../helpers/stringHelper';

const props = withDefaults(defineProps<{
    modelValue?: number
    maxPage?: number
    color?: SpaceColor,
    loading?: boolean
}>(), {
    modelValue: 1,
    maxPage: 1,
    color: 'primary',
    loading: false
});
const emit = defineEmits<{
    'update:modelValue': [newValue: number]
}>();

const model = computed<string>({
    get() {
        return String(props.modelValue);
    }, set(value: number | string) {
        emit('update:modelValue', Number(value));
    }
});

const pageOptions = computed(() => Array.from({ length: props.maxPage }, (_, i) => ({ value: String(i + 1), name: String(i + 1) })));
</script>

<style scoped lang="scss">
.ipl-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;

    > .page-select {
        display: flex;

        > .ipl-select__wrapper {
            min-width: 2.5em;
            margin-right: 0.2em;
        }

        > span {
            margin-top: 2px;
        }
    }

    > .page-buttons {
        font-size: 0.75em;
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        gap: 4px;
    }
}
</style>
