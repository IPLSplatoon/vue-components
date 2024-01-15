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
            <ipl-button
                inline
                color="transparent"
                icon="chevron-left"
                :disabled="props.modelValue === 1"
                @click="emit('update:modelValue', props.modelValue - 1)"
            />
            <ipl-button
                inline
                color="transparent"
                icon="chevron-right"
                :disabled="props.modelValue === props.maxPage"
                @click="emit('update:modelValue', props.modelValue + 1)"
            />
        </div>
    </ipl-space>
</template>

<script setup lang="ts">
import IplSpace from './iplSpace.vue';
import { computed } from 'vue';
import IplSelect from './iplSelect.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import IplButton from './iplButton.vue';
import { SpaceColor } from '../helpers/spaceColorHelper';
import { pluralize } from '../helpers/stringHelper';

library.add(faChevronLeft, faChevronRight);

const props = withDefaults(defineProps<{
    modelValue?: number
    maxPage?: number
    color?: SpaceColor
}>(), {
    modelValue: 1,
    maxPage: 1,
    color: 'primary'
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

        > *:first-child {
            margin-right: 4px;
        }
    }
}
</style>
