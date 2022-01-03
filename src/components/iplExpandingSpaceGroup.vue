<template>
    <div class="ipl-expanding-space-group">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, ref, watch } from 'vue';

export default defineComponent({
    name: 'IplExpandingSpaceGroup',

    props: {
        modelValue: {
            type: [String, null] as PropType<string | null>,
            default: null
        },
    },

    emits: [ 'update:modelValue' ],

    setup(props) {
        const selectedSpace = ref<string | null>(null);

        watch(() => props.modelValue, newValue => {
            selectedSpace.value = newValue;
        }, { immediate: true });

        provide('activeSpace', selectedSpace);
    }
});
</script>
